import { FilterQuery } from 'mongoose';
import { convertToObjectId } from '@/utils/convertToObjectId';
import {
  AdministratorDocument,
  AdministratorModel,
  IAdministrator,
} from '../model';
import { AdministratorService as IAdministratorService } from './types';

export class AdministratorService implements IAdministratorService {
  private readonly Administrator: AdministratorModel;

  constructor(_Administrator: AdministratorModel) {
    this.Administrator = _Administrator;
  }

  public signUp: IAdministratorService['signUp'] = async (administrator) => {
    const newAdministrator = await new this.Administrator(administrator).save();
    return newAdministrator;
  };

  public editAccount: IAdministratorService['editAccount'] = async (
    _id,
    administrator,
  ) => {
    const editedAccount = await this.Administrator.findOneAndUpdate(
      { _id },
      { $set: administrator },
      { new: true },
    );

    return editedAccount;
  };

  public editRoles: IAdministratorService['editRoles'] = async (_id, roles) => {
    const editedAdministrator = await this.Administrator.findOneAndUpdate(
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

  public toggleActivated: IAdministratorService['toggleActivated'] = async (
    _id,
  ) => {
    // get the administrator account
    const account = await this.Administrator.findOne({ _id });

    // return null if the account not found
    if (!account) {
      return null;
    }

    // toggle activated
    const editedAccount = await this.Administrator.findOneAndUpdate(
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

  public getAccounts: IAdministratorService['getAccounts'] = async () => {
    const accounts = await this.Administrator.aggregate([
      { $match: {} },
      { $project: { password: 0 } },
    ]);

    return accounts;
  };

  public getAccountByEmail: IAdministratorService['getAccountByEmail'] = async (
    email,
  ) => {
    const [adminstartor] =
      await this.Administrator.aggregate<AdministratorDocument>([
        { $match: { email } },
      ]);

    return adminstartor;
  };

  public getAccountById: IAdministratorService['getAccountById'] = async (
    _id,
  ) => {
    const [adminstartor] =
      await this.Administrator.aggregate<AdministratorDocument>([
        { $match: { _id: convertToObjectId(_id) } },
      ]);

    return adminstartor;
  };

  public isEmailExist: IAdministratorService['isEmailExist'] = async (
    email,
    _id,
  ) => {
    const filterQuery: FilterQuery<IAdministrator> = {
      email,
    };

    if (_id) {
      filterQuery._id = { $ne: { _id } };
    }

    const account = await this.Administrator.findOne(filterQuery);
    const isExist = account ? true : false;

    return isExist;
  };
}
