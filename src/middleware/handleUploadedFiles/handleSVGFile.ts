import { multer } from './multer';
import { HttpError, statuses } from '@/lib/httperror';
import { Request, Response, NextFunction } from 'express';

export function handleSVG(fieldname: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
      allowedExt: ['.svg'],
    }).single(fieldname);

    upload(req, res, (err) => {
      if (err) {
        next(
          new HttpError({ status: statuses.Bad_Request, message: err.message }),
        );
      }
      next();
    });
  };
}
