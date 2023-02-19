import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { Roles } from '@/static/roles';

// add User to request
declare module 'express-serve-static-core' {
  interface Request {
    User?: Payload['User'];
  }
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export type File = { publicId: string; url: string };

export type ObjectId = Copy<Types.ObjectId>;

export type Payload = {
  User: {
    _id: ObjectId;
    username: string;
    roles: Roles[];
    email: string;
  };
};

export type Copy<T> = Pick<T, keyof T>;
