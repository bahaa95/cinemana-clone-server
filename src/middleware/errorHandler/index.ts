import { Request, Response, NextFunction } from 'express';
import { HttpError, HttpErrorOpject, statuses } from '@/lib/httperror';
import { logger } from '@/lib/logger';
import { isDevelopment } from '@/utils/isDevelopment';
import { isProduction } from '@/utils/isProduction';

// eslint-disable-next-line import/prefer-default-export
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // check if the error is HttpError
  if (HttpError.isValid(err)) {
    const error = err as HttpErrorOpject;
    isDevelopment() === true && logger.http(error.message, error);
    return res
      .status(error.status)
      .json(isProduction() ? error.toClient() : error);
  }
  // check if the error is ibvalid json error
  else if (err instanceof SyntaxError && 'body' in err) {
    return res.status(statuses.Bad_Request).json({ message: 'invalid json' });
  } else {
    logger.error(err?.message, err);
    /* tslint:disable-next-line */
    process.exit(1);
  }
}
