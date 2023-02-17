import { Request } from 'express';
import { Types } from 'mongoose';
import { Roles } from '@/static/roles';

// add User to request
declare module 'express-serve-static-core' {
  interface Request {
    User?: Payload['User'];
  }
}

export type File = { publicId: string; url: string };

export type ObjectId = Types.ObjectId;

export type Payload = {
  User: {
    _id: ObjectId;
    username: string;
    roles: Roles[];
    email: string;
  };
};
