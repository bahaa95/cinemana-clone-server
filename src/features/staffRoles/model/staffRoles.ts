import { Schema, model } from 'mongoose';
import {
  StaffRole as IStaffRole,
  StaffRoleModel,
  StaffRoleDocument,
} from './types';
import { HttpError, statuses } from '@/lib/httperror';

const StaffRoleSchema = new Schema<IStaffRole, StaffRoleModel>(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

StaffRoleSchema.post(
  'save',
  (error: any, doc: StaffRoleDocument, next: any) => {
    if (error.code === 11000) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: `Add role failed. role ${error?.keyValue?.title} is already exists.`,
        }),
      );
    }

    next(error);
  },
);

StaffRoleSchema.post(
  'findOneAndUpdate',
  (error: any, doc: StaffRoleDocument, next: any) => {
    if (error.code === 11000) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: `Edit role failed. role ${error?.keyValue?.title} is already exists.`,
        }),
      );
    }

    next(error);
  },
);

export const StaffRole = model<IStaffRole, StaffRoleModel>(
  'StaffRole',
  StaffRoleSchema,
  'staffRoles',
);
