import { ObjectId } from '@/types';
import { IAdministrator, AdministratorDocument } from '../model';

export interface AdministratorService {
  signUp: (
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

  getAccountByEmail: (
    email: IAdministrator['email'],
  ) => Promise<AdministratorDocument | null>;

  getAccountById: (_id: ObjectId) => Promise<AdministratorDocument | null>;

  isEmailExist: (
    email: IAdministrator['email'],
    _id?: ObjectId,
  ) => Promise<boolean>;
}
