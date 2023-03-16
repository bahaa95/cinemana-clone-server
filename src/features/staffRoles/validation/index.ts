import * as zod from 'zod';
import { TypeOf } from 'zod';

let role = {
  title: zod
    .string({
      invalid_type_error: 'Title must be a string.',
      required_error: 'Title is required.',
    })
    .trim()
    .min(3, 'Title must be at least 3 characters long.')
    .max(25, 'Title must not be more than 25 characters long.')
    .regex(/^[a-z]+$/, 'Use only [a-z] characters in title.'),
};

let params = {
  _id: zod
    .string({
      required_error: '_id is required',
    })
    .trim()
    .min(12, 'Invalid _id.')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.'),
};

export const addRoleSchema = zod.object({
  body: zod.object({ ...role }),
});

export const editRoleSchema = zod.object({
  params: zod.object({
    _id: params._id,
  }),
  body: zod.object({ ...role }),
});

export const deleteRoleSchema = zod.object({
  params: zod.object({
    _id: params._id,
  }),
});

export type AddRoleSchema = TypeOf<typeof addRoleSchema>;
export type EditRoleSchema = TypeOf<typeof editRoleSchema>;
export type DeleteRoleSchema = TypeOf<typeof deleteRoleSchema>;
