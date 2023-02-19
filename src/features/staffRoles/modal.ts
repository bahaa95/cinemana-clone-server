import { Schema, model } from 'mongoose';
import { StaffRole as IStaffRole, StaffRoleModel } from './types';
import { HttpError, statuses } from '@/lib/httperror';

const StaffRoleSchema = new Schema<IStaffRole, StaffRoleModel>(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

StaffRoleSchema.post('save', (error: any, doc: IStaffRole, next: any) => {
    if (error.code === 11000) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: 'Role is already exists',
        }),
      );
    }

    next(
      new HttpError({
        status: statuses.Bad_Request,
        message: 'Something went wrong when adding new role.',
      }),
    );
});

StaffRoleSchema.post('findOneAndUpdate', (error: any, doc: IStaffRole, next: any) => {
    if (error.code === 11000) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: 'Role is already exists',
        }),
      );
    }

    next(
      new HttpError({
        status: statuses.Bad_Request,
        message: 'Something went wrong when adding new role.',
      }),
    );
});

export const StaffRole = model<IStaffRole, StaffRoleModel>(
  'StaffRole',
  StaffRoleSchema,
  'staffRoles',
);
