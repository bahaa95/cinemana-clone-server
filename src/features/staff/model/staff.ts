import { Schema, model, Types } from 'mongoose';
import { Person , StaffModel } from './types';

const StaffSchema = new Schema<Person, StaffModel>({
  name: { type: String, required: true, trim: true },
  image: {
    publicId: { type: String, default: null },
    url: { type: String, default: null },
  },
  roles: [Types.ObjectId],
});

export const Staff = model<Person, StaffModel>('Staff', StaffSchema, 'staff');
