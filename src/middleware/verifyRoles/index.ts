import { Request, Response, NextFunction } from 'express';
import { HttpError, statuses } from '@/lib/httperror';

export function verifyRoles(...allowedRoles: readonly string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get user roles from request
      const userRoles = req.User?.roles;

      // check if user has one or more role from allowed roles
      const isUserAllowed = allowedRoles
        .map((role) => userRoles?.includes(role))
        .includes(true);

      // thow HttpError if user not allowed
      if (!isUserAllowed) {
        throw new HttpError({ status: statuses.Forbidden });
      }

      next();
    } catch (error: any) {
      next(error);
    }
  };
}
