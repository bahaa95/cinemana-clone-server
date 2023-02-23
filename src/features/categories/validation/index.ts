import zod, { TypeOf } from 'zod';

const body = zod.object({
  title: zod
    .string({
      invalid_type_error: 'Title must be a string.',
      required_error: 'Title is required.',
    })
    .trim()
    .min(3, 'Title must be at least 3 characters long.')
    .max(50, 'Title must not be more than 50 characters long.')
    .regex(/^[a-z\s]+$/, 'Use only [a-z, space] characters in title.'),
});

const params = zod.object({
  _id: zod
    .string({
      required_error: '_id is required',
    })
    .trim()
    .min(12, 'Invalid _id.')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.'),
});

export const addCategorySchema = zod.object({
  body,
});

export const editCategorySchema = zod.object({
  params,
  body,
});

export const deleteCategorySchema = zod.object({
  params,
});

export type AddCategorySchema = TypeOf<typeof addCategorySchema>;
export type EditCategorySchema = TypeOf<typeof editCategorySchema>;
export type DeleteCategorySchema = TypeOf<typeof deleteCategorySchema>;
