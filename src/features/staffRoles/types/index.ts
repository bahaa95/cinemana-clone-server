import { HydratedDocument, Model } from 'mongoose';
import { ObjectId, Copy, Middleware } from '@/types';
export type {
  AddRoleSchema,
  DeleteRoleSchema,
  EditRoleSchema,
} from '../validation';

export interface StaffRole {
  title: string;
}

export type StaffRoleDocument = Copy<HydratedDocument<StaffRole>>;

export type StaffRoleModel = Model<StaffRole>;

export interface StaffRoleService {
  addRole: (role: StaffRole) => Promise<StaffRoleDocument>;
  editRole: (
    _id: ObjectId,
    role: StaffRole,
  ) => Promise<StaffRoleDocument | null>;
  deleteRole: (_id: ObjectId) => Promise<StaffRoleDocument | null>;
  getRoles: () => Promise<StaffRoleDocument[]>;
  isExist: (options: IsExistOptions) => Promise<boolean>;
}

type IsExistOptions = { _id?: ObjectId; title: StaffRole['title'] };

export interface StaffRoleController {
  addRole: Middleware;
  editRole: Middleware;
  deleteRole: Middleware;
  getRoles: Middleware;
  isAlreadyExist: Middleware;
}
