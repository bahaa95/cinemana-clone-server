import zod, { TypeOf } from 'zod';

let adminstrator = {
  email: zod
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required.',
    })
    .email('Invalid email.')
    .max(40, 'Email must not be more than 40 characters long.'),

  password: zod
    .string({
      invalid_type_error: 'Password must be a string.',
      required_error: 'Password is required.',
    })
    .min(8, 'Password must be at least 8 characters long.')
    .max(16, 'Password must not be more than 16 characters long.')
    .regex(/^\S.*[^\s]$/, 'Password must not start and end with space.'),
};

const params = zod.object({
  _id: zod
    .string({
      required_error: '_id is required',
    })
    .trim()
    .min(12, 'Invalid _id.')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.'),
});

export let signupSchema = zod.object({
  body: zod.object({ ...adminstrator }),
});

export let signinSchema = zod.object({
  body: zod.object({ ...adminstrator }),
});

export let editAccountSchema = zod.object({
  params,
  body: zod.object({ ...adminstrator }),
});

export let editRolesSchema = zod.object({
  params,
  body: zod.object({
    roles: zod.preprocess(
      (e) => (e ? (typeof e === 'string' ? JSON.parse(e) : e) : undefined),
      zod
        .string()
        .array()
        .min(1, 'Roles must contain at least 1 role.')
        .max(3, 'Roles must not be greater than 3 role.'),
    ),
  }),
});

export let toggleActivationSchema = zod.object({
  params,
});

export type SignupSchema = TypeOf<typeof signupSchema>;
export type SigninSchema = TypeOf<typeof signinSchema>;
export type EditAccountSchema = TypeOf<typeof editAccountSchema>;
export type EditRolesSchema = TypeOf<typeof editRolesSchema>;
export type ToggleActivationSchema = TypeOf<typeof toggleActivationSchema>;
