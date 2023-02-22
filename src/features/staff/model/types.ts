import { HydratedDocument, Model } from 'mongoose';
import { File, ObjectId, Copy, Doc } from '@/types';
import { StaffRole } from '@/features/staffRoles';

export interface Person {
  name: string;
  image: File;
  roles: ObjectId[];
}

export type PersonDocument = Copy<
  HydratedDocument<
    Omit<Person, 'roles'> & {
      roles: Doc<StaffRole>[];
    }
  >
>;

export type StaffModel = Model<Person>;
