import { Schema, model, Types } from 'mongoose';
import { HttpError, statuses } from '@/lib/httperror';
import { Group as IGroup, GroupModel } from './types';

let GroupSchema = new Schema<IGroup, GroupModel>(
  {
    title: { type: String, trim: true, required: true, unique: true },
    videos: { type: [Types.ObjectId], required: true },
  },
  { timestamps: true },
);

GroupSchema.post('save', (error: any, doc: IGroup, next: any) => {
  if (error.code === 11000) {
    next(
      new HttpError({
        status: statuses.Conflict,
        message: `Group ${error?.keyValue?.title} is already exists.`,
        feature: 'groups',
      }),
    );
  }

  next(error);
});

GroupSchema.post('findOneAndUpdate', (error: any, doc: IGroup, next: any) => {
  if (error.code === 11000) {
    next(
      new HttpError({
        status: statuses.Conflict,
        message: `Group ${error?.keyValue?.title} is already exists.`,
        feature: 'groups',
      }),
    );
  }

  next(error);
});

export let Group = model<IGroup, GroupModel>('Group', GroupSchema, 'groups');
