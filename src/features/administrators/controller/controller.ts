import { Request, CookieOptions } from 'express';
import { Middleware, ObjectId, PayloadJWT } from '@/types';
import { HttpError, statuses } from '@/lib/httperror';
import { bcrypt } from '@/lib/bcrypt';
import { jwt } from '@/lib/jwt';
import {
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
} from '@/config';
import { isProduction } from '@/utils/isProdection';
import { IAdministratorService } from '../service';
import {
  AdminstratorController as IAdminstratorController,
  Payload,
} from './types';
import {
  SignupSchema,
  EditAccountSchema,
  EditRolesSchema,
} from '../validation';
import { parseRoles } from '../utils/parsRoles';
import { convertToObjectId } from '@/utils/convertToObjectId';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: isProduction(),
  maxAge: 1000 * 60 * 60 * 24,
};

export class AdminstratorController implements IAdminstratorController {
  private readonly adminstratorService: IAdministratorService;

  constructor(_adminstratorService: IAdministratorService) {
    this.adminstratorService = _adminstratorService;
  }

  public signup: Middleware = async (
    req: Request<{}, {}, SignupSchema['body']>,
    res,
    next,
  ) => {
    try {
      const { email, password } = req.body;

      // hash password
      const hash = await bcrypt.hash(password);

      // add adminstrator to database
      await this.adminstratorService.addAdministrator({
        email,
        password: hash,
      });

      res.status(201).json({
        message: 'Signup successfully.',
      });
    } catch (error) {
      next(error);
    }
  };

  public signin: Middleware = async (
    req: Request<{}, {}, SignupSchema['body']>,
    res,
    next,
  ) => {
    try {
      let { account } = req.Payload as Payload;

      // generate access token
      let accessTokenPayload = {
        User: {
          _id: account._id,
          email: account.email,
          roles: account.roles,
        },
      };

      const accessToken = await jwt.sign(
        accessTokenPayload,
        ACCESS_TOKEN_PRIVATE_KEY,
        {
          algorithm: 'RS512',
          expiresIn: '15m',
        },
      );

      // generate refresh token
      let refreshTokenPayload = {
        User: {
          _id: account._id,
        },
      };

      const refreshToken = await jwt.sign(
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

      res.status(202).json({ accessToken });
    } catch (error) {
      next(error);
    }
  };

  public editAccount: Middleware = async (
    req: Request<any, {}, EditAccountSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      let data = req.body;

      // hash password
      const hash = await bcrypt.hash(data.password);

      // update account
      let editedAccount = await this.adminstratorService.editAccount(_id, {
        ...data,
        password: hash,
      });

      // throw HttpError if account not found
      if (!editedAccount) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Account not found.',
          feature: 'adminstrators',
        });
      }

      res.status(200).json({ message: 'Account edited successfully.' });
    } catch (error) {
      next(error);
    }
  };

  public editRoles: Middleware = async (
    req: Request<any, {}, EditRolesSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id);
      let roles = parseRoles(req.body.roles);

      // edit roles
      let editedAccount = await this.adminstratorService.editRoles(_id, roles);

      // throw HttpError if account is not found
      if (!editedAccount) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Account not found.',
          feature: 'adminstrators',
        });
      }

      res.status(200).json(editedAccount);
    } catch (error) {
      next(error);
    }
  };

  public toggleActivated: Middleware = async (req: Request<any>, res, next) => {
    try {
      const _id = convertToObjectId(req.params._id);

      // toggle activation
      let editedAccount = await this.adminstratorService.toggleActivated(_id);

      // throw HttpError if account is not found
      if (!editedAccount) {
        throw new HttpError({
          status: statuses.Not_Found,
          message: 'Account not found.',
          feature: 'adminstrators',
        });
      }

      res.status(200).json(editedAccount);
    } catch (error) {
      next(error);
    }
  };

  public getAccounts: Middleware = async (req, res, next) => {
    try {
      // get accounts
      let accounts = await this.adminstratorService.getAccounts();

      res.status(200).json(accounts);
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
      let payload: PayloadJWT;
      try {
        payload = await jwt.verify<PayloadJWT>(
          cookies.refreshToken,
          REFRESH_TOKEN_PUBLIC_KEY,
        );
      } catch {
        res.clearCookie('refreshToken', cookieOptions);
        throw new HttpError({ status: statuses.Unauthorized });
      }

      // get adminstrator account
      const _id = convertToObjectId(payload.User._id);
      let adminstrator = await this.adminstratorService.getAccount({ _id });

      // throw HttpError if adminstrator account not found
      if (!adminstrator) {
        res.clearCookie('refreshToken', cookieOptions);
        throw new HttpError({ status: statuses.Unauthorized });
      }

      // generate new accessToken
      let accessTokenPayload = {
        User: {
          _id: adminstrator._id,
          email: adminstrator.email,
          roles: adminstrator.roles,
        },
      };

      const accessToken = await jwt.sign(
        accessTokenPayload,
        ACCESS_TOKEN_PRIVATE_KEY,
        {
          algorithm: 'RS512',
          expiresIn: '15m',
        },
      );

      res.status(200).json({ accessToken });
    } catch (error: any) {
      next(error);
    }
  };

  public emailMustNotExistBefore: Middleware = async (
    req: Request<any, {}, SignupSchema['body']>,
    res,
    next,
  ) => {
    try {
      const _id = convertToObjectId(req.params._id) as ObjectId | undefined;
      const { email } = req.body;
      const isExist = await this.adminstratorService.isEmailExist(email, _id);

      // throw HttpError if email already exists
      if (isExist) {
        throw new HttpError({
          status: statuses.Conflict,
          message: 'Email already exists.',
          feature: 'adminstrators',
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  public isEmailExist: Middleware = async (
    req: Request<{}, {}, SignupSchema['body']>,
    res,
    next,
  ) => {
    try {
      const { email } = req.body;

      // get account by email
      let account = await this.adminstratorService.getAccount({ email });

      // throw HttpError if account not found
      if (!account) {
        throw new HttpError({
          status: statuses.Bad_Request,
          message: 'Invalid email.',
          feature: 'adminstrators',
        });
      }

      req.Payload = {
        account,
      };

      next();
    } catch (error) {
      next(error);
    }
  };

  public comparePassword: Middleware = async (
    req: Request<{}, {}, SignupSchema['body']>,
    res,
    next,
  ) => {
    try {
      const { password } = req.body;
      let { account } = req.Payload as Payload;

      // compare password
      const passwordMatch = await bcrypt.compare(password, account.password);

      // throw HttpError if password not match
      if (!passwordMatch) {
        throw new HttpError({
          status: statuses.Bad_Request,
          message: 'Invalid password.',
          feature: 'adminstrators',
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };

  public isAccountActivated: Middleware = async (req, res, next) => {
    try {
      let { account } = req.Payload as Payload;

      // throw HttpError if account not activated
      if (!account.activated) {
        throw new HttpError({
          status: statuses.Forbidden,
          message: 'Account not activated yet.',
          feature: 'adminstrators',
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
