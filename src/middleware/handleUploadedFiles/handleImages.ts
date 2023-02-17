import { multer } from './multer';
import { HttpError, statuses } from '@/lib/httperror';
import { Request, Response, NextFunction } from 'express';

type Field = { name: string; maxCount: number };

export function handleImages(fields: readonly Field[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const upload = multer({
      allowedExt: ['.jpg', '.jpeg', '.png'],
    }).fields(fields);

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
