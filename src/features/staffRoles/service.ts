import {
  StaffRoleService as IStaffRoleService,
  StaffRoleModel as TStaffRoleModel,
  StaffRoleDocument,
} from './types';

export class StaffRoleService implements IStaffRoleService {
  private readonly StaffRole: TStaffRoleModel;

  constructor(StaffRoleModel: TStaffRoleModel) {
    this.StaffRole = StaffRoleModel;
  }

  addRole: IStaffRoleService['addRole'] = async (role) => {
    const newRole = await new this.StaffRole(role).save();
    return newRole;
  };

  editRole: IStaffRoleService['editRole'] = async (_id, role) => {
    const editedRole = await this.StaffRole.findOneAndUpdate(
      { _id },
      { $set: role },
      { new: true },
    );

    return editedRole;
  };

  deleteRole: IStaffRoleService['deleteRole'] = async (_id) => {
    const deleteRole = await this.StaffRole.findByIdAndDelete({ _id });
    return deleteRole;
  };

  getRoles: IStaffRoleService['getRoles'] = async () => {
    const roles = await this.StaffRole.aggregate<StaffRoleDocument>([
      { $match: {} },
    ]);
    return roles;
  };

  isExist: IStaffRoleService['isExist'] = async (options) => {
    const { _id, title } = options;
    let result = false;

    if (_id) {
      const exists = await this.StaffRole.findOne({ _id: { $ne: _id }, title });
      if (exists) {
        result = true;
      }
    } else {
      const exists = await this.StaffRole.findOne({ title });
      if (exists) {
        result = true;
      }
    }

    return result;
  };
}
