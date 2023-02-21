import { Request, Response, NextFunction } from 'express';
import { HttpError, statuses } from '@/lib/httperror';

export function ValidateFile(
  message = 'There is no file exists please select one',
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      next(
        new HttpError({
          status: statuses.Bad_Request,
          message,
        }),
      );
    }

    next();
  };
}
