import { ObjectId } from '@/types';
import { IStaffRole, StaffRoleDocument } from '../model';

export interface StaffRoleService {
  addRole: (role: IStaffRole) => Promise<StaffRoleDocument>;
  editRole: (
    _id: ObjectId,
    role: IStaffRole,
  ) => Promise<StaffRoleDocument | null>;
  deleteRole: (_id: ObjectId) => Promise<StaffRoleDocument | null>;
  getRoles: () => Promise<StaffRoleDocument[]>;
}
