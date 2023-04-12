import { PersonDocument } from '../model';
import { StaffService as IStaffService, PersonAndVideos } from './types';
import { StaffModel } from '../model';
import { lookupToRoles, lookupToVideos } from './query';

// ! don't return the value for private methods to clients or admins it's for internal usage only.
// ! only return the value for public methods.

export class StaffService implements IStaffService {
  private readonly Staff: StaffModel;

  constructor(_Staff: StaffModel) {
    this.Staff = _Staff;
  }

  /**
   * @access public dashboard
   */
  public addPerson: IStaffService['addPerson'] = async (person) => {
    const { _id } = await new this.Staff(person).save();
    let newPerson = await this.getPerson({_id});
    return newPerson;
  };

  /**
   * @access public dashboard
   */
  public editPerson: IStaffService['editPerson'] = async (_id, person) => {
    let editedPerson = await this.Staff.findOneAndUpdate(
      { _id },
      { $set: person },
    );

    if (!editedPerson) {
      return null;
    }

    // return person document for edited person
    let personDoc = await this.getPerson({_id:editedPerson._id});
    return personDoc;
  };

  /**
   * @access public dashboard
   */
  public deletePerson: IStaffService['deletePerson'] = async (_id) => {
    // get the person document before delete
    let personDoc = await this.getPerson({_id});

    // return null if the person is not found
    if (!personDoc) {
      return null;
    }

    // delete the person
    await this.Staff.findOneAndDelete({ _id });
    return personDoc;
  };

  /**
   * @access public dashboard
   */
  public getStaff: IStaffService['getStaff'] = async () => {
    let staff = await this.Staff.aggregate<PersonDocument>([
      { $match: {} },
      {
        $lookup: lookupToRoles,
      },
    ]);

    return staff;
  };

  /**
   * @access public dashboard
   */
  public getStaffByRole: IStaffService['getStaffByRole'] = async (role) => {
    let staff = await this.Staff.aggregate([
      { $match: { roles: role } },
      {
        $lookup: lookupToRoles,
      },
    ]);

    return staff;
  };

  /**
   * @access public dashboard
   */
  public getPerson: IStaffService['getPerson'] = async (query) => {
    let [person] = await this.Staff.aggregate<PersonDocument>([
      { $match: { ...query } },
      {
        $lookup: lookupToRoles,
      },
    ]);

    return person;
  };

  /**
   * @access public cinemana-client
   */
  public getPersonWithVideos: IStaffService['getPersonWithVideos'] = async (
    _id,
  ) => {
    let [person] = await this.Staff.aggregate<PersonAndVideos>([
      { $match: { _id } },
      {
        $lookup: lookupToRoles,
      },
      {
        $lookup: lookupToVideos('actors', 'actorVideos'),
      },
      {
        $lookup: lookupToVideos('writers', 'writerVideos'),
      },
      {
        $lookup: lookupToVideos('directors', 'dierctorVideos'),
      },
    ]);

    if (!person) return null;

    return person;
  };
}
