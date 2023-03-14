import { Schema, model } from 'mongoose';
import { User as IUser, UserModel, UserDocument } from './types';
import { HttpError, statuses } from '@/lib/httperror';

let UserSchema = new Schema<IUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

UserSchema.post('save', (error: any, doc: UserDocument, next: any) => {
  // username already exists
  if (error.code === 11000) {
    if (error?.keyValue?.username) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: `Signup failed. username ${error.keyValue?.username} is already exists.`,
          feature: 'user',
        }),
      );
    }

    // email already exists
    if (error?.keyValue?.email) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: `Signup failed. email ${error.keyValue?.email} is already exists.`,
          feature: 'user',
        }),
      );
    }
  }

  next(error);
});

export let User = model<IUser, UserModel>('User', UserSchema, 'users');
