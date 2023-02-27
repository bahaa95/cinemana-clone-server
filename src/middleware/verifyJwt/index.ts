import { Request, Response, NextFunction } from 'express';
import { jwt } from '@/lib/jwt';
import { HttpError, statuses } from '@/lib/httperror';
import { ACCESS_TOKEN_PUBLIC_KEY } from '@/config/index';
import { PayloadJWT } from '@/types';

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // get authorization from reques header
    const authorization = (req.headers?.authorization ||
      req.headers?.Authorization) as string | undefined;

    if (
      !authorization ||
      (!authorization.startsWith('Bearar ') &&
        !authorization.startsWith('bearar '))
    ) {
      throw new HttpError({
        status: statuses.Unauthorized,
      });
    }

    // get accessToken from authorization
    const [, accessToken] = authorization.split(' ');

    // verify accessToken
    let payload: PayloadJWT;
    try {
      payload = await jwt.verify<PayloadJWT>(
        accessToken,
        ACCESS_TOKEN_PUBLIC_KEY,
      );
    } catch {
      throw new HttpError({ status: statuses.Unauthorized });
    }

    // add user data to request
    req.User = payload.User;
    next();
  } catch (error: any) {
    next(error);
  }
}
