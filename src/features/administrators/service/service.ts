import { AdministratorDocument, AdministratorModel } from '../model';
import {
  AdministratorFilterQuery,
  AdministratorService as IAdministratorService,
} from './types';

// ! don't return the value for private method to clients and admins it's for internal usage only.
// ! only return the value for public methods.

export class AdministratorService implements IAdministratorService {
  private readonly Administrator: AdministratorModel;

  constructor(_Administrator: AdministratorModel) {
    this.Administrator = _Administrator;
  }

  /**
   * @access private
   */
  public addAdministrator: IAdministratorService['addAdministrator'] = async (
    administrator,
  ) => {
    let newAdministrator = await new this.Administrator(administrator).save();
    return newAdministrator;
  };

  /**
   * @access private
   */
  public editAccount: IAdministratorService['editAccount'] = async (
    _id,
    administrator,
  ) => {
    let editedAccount = await this.Administrator.findOneAndUpdate(
      { _id },
      { $set: administrator },
      { new: true },
    );

    return editedAccount;
  };

  /**
   * @access public dashboard
   */
  public editRoles: IAdministratorService['editRoles'] = async (_id, roles) => {
    let editedAdministrator = await this.Administrator.findOneAndUpdate(
      {
        _id,
      },
      {
        $set: {
          roles,
        },
      },
      { new: true, select: { password: 0 } },
    );

    return editedAdministrator;
  };

  /**
   * @access public dashboard
   */
  public toggleActivated: IAdministratorService['toggleActivated'] = async (
    _id,
  ) => {
    // get the administrator account
    let account = await this.getAccount({ _id });

    // return null if the account not found
    if (!account) {
      return null;
    }

    // toggle activated
    let editedAccount = await this.Administrator.findOneAndUpdate(
      {
        _id: account._id,
      },
      {
        $set: {
          activated: !account.activated,
        },
      },
      { new: true, select: { password: 0 } },
    );

    return editedAccount;
  };

  /**
   * @access public dashboard
   */
  public getAccounts: IAdministratorService['getAccounts'] = async () => {
    let accounts = await this.Administrator.aggregate([
      { $match: {} },
      { $project: { password: 0 } },
    ]);

    return accounts;
  };

  /**
   * @access private
   */
  public getAccount: IAdministratorService['getAccount'] = async (query) => {
    let [adminstartor] =
      await this.Administrator.aggregate<AdministratorDocument>([
        { $match: { ...query } },
      ]);

    if (!adminstartor) return null;

    return adminstartor;
  };

  /**
   * @access private
   */
  public isEmailExist: IAdministratorService['isEmailExist'] = async (
    email,
    _id,
  ) => {
    let filterQuery: AdministratorFilterQuery = {
      email,
    };

    if (_id) {
      filterQuery._id = { $ne: { _id } };
    }

    let account = await this.Administrator.findOne(filterQuery);
    const isExist = account ? true : false;

    return isExist;
  };
}
