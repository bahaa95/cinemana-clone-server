import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpError, statuses } from '@/lib/httperror';
import { isDevelopment } from '@/utils/isDevelopment';

export function validateResource(schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      const error = new HttpError({
        status: statuses.Bad_Request,
        message: 'Validation failed.',
      });

      // add errors detailes to error in development environment
      if (isDevelopment()) {
        error.details = e.errors;
      }

      next(error);
    }
  };
}
