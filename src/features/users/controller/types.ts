import { Middleware, ObjectId } from '@/types';

export interface UserController {
  signUp: Middleware;
  signIn: Middleware;
  logOut: Middleware;
  refreshToken: Middleware;
}

export type UserRefreshTokenPayload = {
  User: {
    _id: ObjectId;
  };
  iat: number;
  exp: number;
};
