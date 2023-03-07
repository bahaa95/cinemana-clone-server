import zod, { TypeOf } from 'zod';
import { isNumber } from '@/utils/isNumber';

let _idSchema = zod
  .string({
    required_error: '_id is required',
  })
  .trim()
  .min(12, 'Invalid _id.')
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.');

let season = {
  videoId: _idSchema,
  season: zod.preprocess(
    (value) => (isNumber(value) ? Number(value) : value),
    zod
      .number({
        required_error: 'Season is required.',
        invalid_type_error: 'Season must be a number.',
      })
      .min(1, 'Season must not be less than 1')
      .max(1000, 'Season must not be greater than 1000.'),
  ),
};

export let addSeasonSchema = zod.object({
  body: zod.object({ ...season }),
});

export let editSeasonSchema = zod.object({
  params: zod.object({
    _id: _idSchema,
  }),
  body: zod.object({ season: season.season }),
});

export const deleteSeasonSchema = zod.object({
  params: zod.object({
    _id: _idSchema,
  }),
});

export type AddSeasonSchema = TypeOf<typeof addSeasonSchema>;
export type EditSeasonSchema = TypeOf<typeof editSeasonSchema>;
export type DeleteSeasonSchema = TypeOf<typeof deleteSeasonSchema>;
