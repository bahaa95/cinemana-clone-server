import { Request, Response, NextFunction } from 'express';
import { HttpError, HttpErrorOpject } from '@/lib/httperror';
import { logger } from '@/lib/logger';
import { isDevelopment } from '@/utils/isDevelopment';

// eslint-disable-next-line import/prefer-default-export
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (HttpError.isValid(err)) {
    const error = err as HttpErrorOpject;
    logger.http(error.message, error);
    res.status(error.status).json(error.toClient());
  } else {
    logger.error(err?.message, err);
    /* tslint:disable-next-line */
    isDevelopment() === true && process.exit(1);
  }
}
