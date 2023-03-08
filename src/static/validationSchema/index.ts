import zod from 'zod';

export let idSchema = zod
  .string({
    required_error: '_id is required',
  })
  .trim()
  .min(12, 'Invalid _id.')
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.');
