import { CookieOptions, Request } from 'express';
import { Middleware } from '@/types';
import { bcrypt } from '@/lib/bcrypt';
import { HttpError, statuses } from '@/lib/httperror';
import { jwt } from '@/lib/jwt';
import {
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
} from '@/config';
import { isProduction } from '@/utils/isProduction';
import { convertToObjectId } from '@/utils/convertToObjectId';
import {
  UserController as IUserController,
  UserRefreshTokenPayload,
} from './types';
import { SignupSchema, SigninSchema } from '../vlaidation';
import { parseUser } from '../utils/parseUser';
import { IUserService } from '../service';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: isProduction() ? 'none' : 'lax',
  secure: isProduction(),
  maxAge: 1000 * 60 * 60 * 24 * 7,
};

export class UserController implements IUserController {
  private readonly userService: IUserService;

  constructor(_userService: IUserService) {
    this.userService = _userService;
  }

  public signUp: Middleware = async (
    req: Request<{}, {}, SignupSchema['body']>,
    res,
    next,
  ) => {
    try {
      let data = parseUser(req.body);

      // hash password
      const passwordHash = await bcrypt.hash(data.password);

      // save user to database
      await this.userService.addUser({
        ...data,
        password: passwordHash,
      });

      res.status(201).json({
        message: 'Signup Successfully.',
      });
    } catch (error) {
      next(error);
    }
  };

  public signIn: Middleware = async (
    req: Request<{}, {}, SigninSchema['body']>,
    res,
    next,
  ) => {
    try {
      const { email, password } = req.body;

      // get user document
      let user = await this.userService.getUser({ email });

      // throw HttpError if user not found
      if (!user) {
        throw new HttpError({
          status: statuses.Bad_Request,
          message: 'Invalid email.',
          feature: 'users',
        });
      }

      // compare password
      const passwordMatch = await bcrypt.compare(password, user.password);

      // throw HttpError if password not match
      if (!passwordMatch) {
        throw new HttpError({
          status: statuses.Bad_Request,
          message: 'Invalid password.',
          feature: 'users',
        });
      }

      /**
       * generate access token with payload
       */
      // payload for access token
      let accessTokenPayload = {
        User: {
          _id: user._id,
          email: user.email,
        },
      };

      // generate access token
      let accessToken = await jwt.sign(
        accessTokenPayload,
        ACCESS_TOKEN_PRIVATE_KEY,
        {
          algorithm: 'RS512',
          expiresIn: '15m',
        },
      );

      /**
       * generate refresh token with payload
       */
      // payload for refresh token
      let refreshTokenPayload = {
        User: {
          _id: user._id,
        },
      };

      // generate refresh token
      let refreshToken = await jwt.sign(
        refreshTokenPayload,
        REFRESH_TOKEN_PRIVATE_KEY,
        {
          algorithm: 'RS512',
          expiresIn: '1d',
        },
      );

      // generate cookie for refresh token
      res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
      });

      res.status(202).json({
        message: 'Sign in successfully.',
        accessToken,
        userName: user.username,
      });
    } catch (error) {
      next(error);
    }
  };

  public logOut: Middleware = async (req, res, next) => {
    try {
      // delete refresh token cookie
      res.clearCookie('refreshToken');

      res.status(202).json({
        message: 'Log out successfully.',
      });
    } catch (error) {
      next(error);
    }
  };

  public refreshToken: Middleware = async (req, res, next) => {
    try {
      let { cookies } = req;

      // throw HttpError if refreshToken cookie does not exist
      if (!cookies?.refreshToken) {
        throw new HttpError({ status: statuses.Unauthorized });
      }

      // verfy the refreshToken
      let payload: UserRefreshTokenPayload;
      try {
        payload = await jwt.verify<UserRefreshTokenPayload>(
          cookies.refreshToken,
          REFRESH_TOKEN_PUBLIC_KEY,
        );
      } catch {
        res.clearCookie('refreshToken');
        throw new HttpError({ status: statuses.Forbidden });
      }

      // get user
      const _id = convertToObjectId(payload.User._id);
      let user = await this.userService.getUser({ _id });

      // throw HttpError if user not found
      if (!user) {
        res.clearCookie('refreshToken');
        throw new HttpError({ status: statuses.Forbidden });
      }

      /**
       * generate access token with payload
       */
      // payload for access token
      let accessTokenPayload = {
        User: {
          _id: user._id,
          email: user.email,
        },
      };

      // generate access token
      let accessToken = await jwt.sign(
        accessTokenPayload,
        ACCESS_TOKEN_PRIVATE_KEY,
        {
          algorithm: 'RS512',
          expiresIn: '15m',
        },
      );

      res.status(202).json({ accessToken, userName: user.username });
    } catch (error) {
      next(error);
    }
  };
}
