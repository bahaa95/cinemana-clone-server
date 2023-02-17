import { Request, Response, NextFunction } from 'express';
import { HttpError, statuses } from '@/lib/httperror';

export function ValidateFiles(...fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.files) {
        throw new HttpError({
          status: statuses.Bad_Request,
          message: 'There is no file exists. please upload all required files',
        });
      }
      /* tslint:disable-next-line */
      for (let i = 0; i < fields.length; i += 1) {
        // @ts-ignore
        if (!req.files[fields[i]] || !req.files[fields[i]].length > 0) {
          throw new HttpError({
            status: statuses.Bad_Request,
            message: `File ${fields[i]} not exists. pleas select one`,
          });
        }
      }

      next();
    } catch (err: any) {
      next(err);
    }
  };
}
