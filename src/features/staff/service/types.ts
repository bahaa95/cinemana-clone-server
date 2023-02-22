import { ObjectId } from '@/types';
import { PersonDocument, Person } from '../model';

export interface StaffService {
  addPerson: (
    person: Omit<Person, 'image'> & { image?: Person['image'] },
  ) => Promise<PersonDocument>;
  editPerson: (
    _id: ObjectId,
    person: Partial<Person>,
  ) => Promise<PersonDocument | null>;
  deletePerson: (_id: ObjectId) => Promise<PersonDocument | null>;
  getStaff: () => Promise<PersonDocument[]>;
  getStaffByRole: (role: ObjectId) => Promise<PersonDocument[]>;
  getPerson: (_id: ObjectId) => Promise<PersonDocument>;
  // getPersonWithMovies(_id: ObjectId)
}
