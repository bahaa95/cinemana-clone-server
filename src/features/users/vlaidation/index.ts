import zod, { TypeOf } from 'zod';

let user = {
  email: zod
    .string({
      invalid_type_error: 'Email must be a string.',
      required_error: 'Email is required.',
    })
    .email('Invalid email.')
    .max(40, 'Email must not be more than 40 characters long.'),

  username: zod
    .string({
      invalid_type_error: 'Username must be a string.',
      required_error: 'Username is required.',
    })
    .min(3, 'Username must not be less than 3 characters long.')
    .max(25, 'Username must not be more than 25 characters long.')
    .regex(
      /^[a-zA-Z_]{1,}[a-zA-Z0-9_]+$/,
      'Username must contain only [a-z,A-Z,0-9,_] characters. and start with a letter.',
    ),

  password: zod
    .string({
      invalid_type_error: 'Password must be a string.',
      required_error: 'Password is required.',
    })
    .min(6, 'Password must be at least 6 characters long.')
    .max(16, 'Password must not be more than 16 characters long.')
    .regex(/^\S.*[^\s]$/, 'Password must not start and end with space.'),
};

export let signupSchema = zod.object({
  body: zod.object({ ...user }),
});

export let signinSchema = zod.object({
  body: zod.object({
    email: user.email,
    password: user.password,
  }),
});

export type SignupSchema = TypeOf<typeof signupSchema>;
export type SigninSchema = TypeOf<typeof signinSchema>;
