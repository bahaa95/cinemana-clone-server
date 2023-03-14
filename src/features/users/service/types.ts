import { FilterQuery } from 'mongoose';
import { IUser, UserDocument } from '../model';

export interface UserService {
  addUser: (user: IUser) => Promise<UserDocument>;
  getUser: (filterQuery: UserFilterQuery) => Promise<UserDocument | null>;
}

export type UserFilterQuery = FilterQuery<IUser>;
