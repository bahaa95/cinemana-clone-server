import { PersonDocument } from '../model';
import { StaffService as IStaffService } from './types';
import { StaffModel } from '../model';
import { lookupToRolesQuery } from './query';
import { convertToObjectId } from '@/utils/convertToObjectId';

export class StaffService implements IStaffService {
  private readonly Staff: StaffModel;

  constructor(_Staff: StaffModel) {
    this.Staff = _Staff;
  }

  addPerson: IStaffService['addPerson'] = async (person) => {
    const { _id } = await new this.Staff(person).save();
    const newPerson = await this.getPerson(_id);
    return newPerson;
  };

  editPerson: IStaffService['editPerson'] = async (_id, person) => {
    const editedPerson = await this.Staff.findOneAndUpdate(
      { _id },
      { $set: person },
    );

    if (!editedPerson) {
      return null;
    }

    // return person document for edited person
    const personDoc = await this.getPerson(editedPerson._id);
    return personDoc;
  };

  deletePerson: IStaffService['deletePerson'] = async (_id) => {
    // get the person document before delete
    const personDoc = await this.getPerson(_id);

    // return null if the person is not found
    if (!personDoc) {
      return null;
    }

    // delete the person
    await this.Staff.findOneAndDelete({ _id });
    return personDoc;
  };

  getStaff: IStaffService['getStaff'] = async () => {
    const staff = await this.Staff.aggregate<PersonDocument>([
      { $match: {} },
      {
        $lookup: {
          ...lookupToRolesQuery,
        },
      },
    ]);

    return staff;
  };

  getStaffByRole: IStaffService['getStaffByRole'] = async (role) => {
    const staff = await this.Staff.aggregate([
      { $match: { roles: convertToObjectId(role) } },
      {
        $lookup: {
          ...lookupToRolesQuery,
        },
      },
    ]);

    return staff;
  };

  getPerson: IStaffService['getPerson'] = async (_id) => {
    const [person] = await this.Staff.aggregate<PersonDocument>([
      { $match: { _id: convertToObjectId(_id) } },
      {
        $lookup: {
          ...lookupToRolesQuery,
        },
      },
    ]);

    return person;
  };
}
