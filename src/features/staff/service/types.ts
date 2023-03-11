import { ObjectId } from '@/types';
import { VideoListItem } from '@/features/videos';
import { PersonDocument, Person } from '../model';

export type PersonAndVideos = Person & {
  actorVideos: VideoListItem[];
  writerVideos: VideoListItem[];
  dierctorVideos: VideoListItem[];
};

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
  getPersonAndVideos: (_id: ObjectId) => Promise<PersonAndVideos | null>;
}
