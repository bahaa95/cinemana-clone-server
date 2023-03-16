import { Schema, model } from 'mongoose';
import {
  Administrator as IAdministrator,
  AdministratorModel,
  AdministratorDocument,
} from './types';
import { AdministratorRoles } from '../roles';
import { HttpError, statuses } from '@/lib/httperror';

const AdministratorSchema = new Schema<IAdministrator, AdministratorModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true, trim: true },
    activated: { type: Boolean, default: false },
    roles: { type: [String], default: [AdministratorRoles.Viewers] },
  },
  { timestamps: true },
);

AdministratorSchema.post(
  'save',
  (error: any, doc: AdministratorDocument, next: any) => {
    if (error.code === 11000) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: `Signup failed. Email is already exists.`,
          feature: 'administrators',
        }),
      );
    }

    next(error);
  },
);

AdministratorSchema.post(
  'findOneAndUpdate',
  (error: any, doc: AdministratorDocument, next: any) => {
    if (error.code === 11000) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: `Edit account failed. Email is already exists.`,
          feature: 'administrators',
        }),
      );
    }

    next(error);
  },
);

export const Administrator = model<IAdministrator, AdministratorModel>(
  'Administrator',
  AdministratorSchema,
  'administrators',
);
