import { StaffRoleService as IStaffRoleService } from './types';
import { StaffRoleModel, StaffRoleDocument } from '../model';

// ! don't return the value for private method to clients and admins it's for internal usage only.
// ! only return the value for public methods.

export class StaffRoleService implements IStaffRoleService {
  private readonly StaffRole: StaffRoleModel;

  constructor(_StaffRoleModel: StaffRoleModel) {
    this.StaffRole = _StaffRoleModel;
  }

  /**
   * @access public dashboard
   */
  public addRole: IStaffRoleService['addRole'] = async (role) => {
    let newRole = await new this.StaffRole(role).save();
    return newRole;
  };

  /**
   * @access public dashboard
   */
  public editRole: IStaffRoleService['editRole'] = async (_id, role) => {
    let editedRole = await this.StaffRole.findOneAndUpdate(
      { _id },
      { $set: role },
      { new: true },
    );

    return editedRole;
  };

  /**
   * @access public dashboard
   */
  public deleteRole: IStaffRoleService['deleteRole'] = async (_id) => {
    let deleteRole = await this.StaffRole.findByIdAndDelete({ _id });
    return deleteRole;
  };

  /**
   * @access public dashboard
   */
  public getRoles: IStaffRoleService['getRoles'] = async () => {
    let roles = await this.StaffRole.aggregate<StaffRoleDocument>([
      { $match: {} },
    ]);
    return roles;
  };
}
