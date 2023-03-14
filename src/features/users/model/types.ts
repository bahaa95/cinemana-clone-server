import { HydratedDocument, Model } from 'mongoose';
import { Copy } from '@/types';

export interface User {
  username: string;
  email: string;
  password: string;
}

export type UserDocument = Copy<HydratedDocument<User>>;

export type UserModel = Model<User>;
