import * as zod from 'zod';
import { TypeOf } from 'zod';

const body = zod.object({
  name: zod
    .string({
      invalid_type_error: 'Name must be a string.',
      required_error: 'Name is required.',
    })
    .trim()
    .min(1, 'Name must be at least 1 character long.')
    .max(40, 'Name must be at most 40 characters long.')
    .regex(/^[a-z\s]+$/, 'Use only [a-z, space] characters in name.'),

  roles: zod.preprocess(
    (e) => (e ? (typeof e === 'string' ? JSON.parse(e) : e) : undefined),
    zod
      .string()
      .array()
      .min(1, 'Roles must contain at least 1 role.')
      .max(3, 'Roles must not be greater than 3 role.'),
  ),
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

export const addStaffSchema = zod.object({
  body,
});

export const editStaffSchema = zod.object({
  params,
  body,
});

export const deleteStaffSchema = zod.object({
  params,
});

export const getStaffByRoleSchema = zod.object({
  params: zod.object({
    roleId: zod
      .string({
        required_error: 'roleId is required',
      })
      .trim()
      .min(12, 'Invalid roleId.')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid roleId.'),
  }),
});

export type AddStaffSchema = TypeOf<typeof addStaffSchema>;
export type EditStaffSchema = TypeOf<typeof editStaffSchema>;
export type DeleteStaffSchema = TypeOf<typeof deleteStaffSchema>;