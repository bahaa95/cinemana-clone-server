import { Schema, model } from 'mongoose';
import { Category as ICategory, CategoryModel } from './types';
import { HttpError, statuses } from '@/lib/httperror';

const CategorySchema = new Schema<ICategory, CategoryModel>(
  {
    title: { type: String, trim: true, required: true, unique: true },
  },
  { timestamps: false },
);

CategorySchema.post('save', (error: any, doc: ICategory, next: any) => {
  if (error.code === 11000) {
    next(
      new HttpError({
        status: statuses.Conflict,
        message: `Add new category failed. Category with title ${doc?.title} is already exists.`,
        feature: 'categories',
      }),
    );
  }

  next(error);
});

CategorySchema.post(
  'findOneAndUpdate',
  (error: any, doc: ICategory, next: any) => {
    if (error.code === 11000) {
      next(
        new HttpError({
          status: statuses.Conflict,
          message: `Edit category failed. Category with title ${doc?.title} is already exists.`,
          feature: 'categories',
        }),
      );
    }

    next(error);
  },
);

export const Category = model<ICategory, CategoryModel>(
  'Category',
  CategorySchema,
  'categories',
);
