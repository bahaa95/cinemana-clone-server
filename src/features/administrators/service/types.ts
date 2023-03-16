import { FilterQuery } from 'mongoose';
import { ObjectId } from '@/types';
import { IAdministrator, AdministratorDocument } from '../model';

export interface AdministratorService {
  addAdministrator: (
    administrator: Pick<IAdministrator, 'email' | 'password'>,
  ) => Promise<AdministratorDocument>;

  editAccount: (
    _id: ObjectId,
    administrator: Pick<IAdministrator, 'email' | 'password'>,
  ) => Promise<AdministratorDocument | null>;

  editRoles: (
    _id: ObjectId,
    roles: IAdministrator['roles'],
  ) => Promise<AdministratorDocument | null>;

  toggleActivated: (_id: ObjectId) => Promise<AdministratorDocument | null>;

  getAccounts: () => Promise<AdministratorDocument[]>;

  getAccount: (
    query: AdministratorFilterQuery,
  ) => Promise<AdministratorDocument | null>;

  isEmailExist: (
    email: IAdministrator['email'],
    _id?: ObjectId,
  ) => Promise<boolean>;
}

export type AdministratorFilterQuery = FilterQuery<IAdministrator>;
