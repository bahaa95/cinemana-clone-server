import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

// add User to request
declare module 'express-serve-static-core' {
  interface Request {
    User: PayloadJWT['User'];
    Payload: object;
  }
}

export type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void;

export type File = { publicId: string; url: string };

export type ObjectId = Copy<Types.ObjectId>;

export type Copy<T> = Pick<T, keyof T>;

/**
 * Add _id property to type T
 */
export type Doc<T> = { _id: ObjectId } & T;

export type ExpressFile = NonNullable<Request['file']>;

export type PayloadJWT = {
  User: {
    _id: ObjectId;
    username: string;
    roles: string[];
    email: string;
  };
  iat: number;
  exp: number;
};
