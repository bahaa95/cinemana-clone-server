import zod, { TypeOf } from 'zod';
import { preProcessBoolean, preProcessDate, preProcessArray } from './helper';
import { isNumber } from '@/utils/isNumber';

let _idSchema = zod
  .string({
    required_error: '_id required.',
    invalid_type_error: 'Invalid _id.',
  })
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid _id.');

let video = {
  isPublic: zod.preprocess(
    preProcessBoolean,
    zod.boolean({
      invalid_type_error: 'Public must be a boolean type.',
      required_error: 'Public is required.',
    }),
  ),

  title: zod
    .string({
      invalid_type_error: 'Title must be a string type.',
      required_error: 'Title is required.',
    })
    .trim()
    .min(1, 'Title is required.')
    .max(50, 'Title must not be greater than 50 characters.')
    .regex(
      /^[a-zA-Z0-9\s-\:]+$/,
      'Use only [a-z, A-Z, 0-9, spaces, -, :] characters in title.',
    ),

  description: zod
    .string({
      invalid_type_error: 'Description must be a string type.',
      required_error: 'Description is required.',
    })
    .trim()
    .min(25, 'Description must not be less than 25 characters.')
    .max(500, 'Description must not be greater than 500 characters.')
    .regex(
      /^[a-zA-Z0-9\s-\.\:'",]+$/,
      'Use only [a-z, A-Z, 0-9, spaces, -, :, ., coma, ", \'] characters in description.',
    ),

  type: zod.enum(['movie', 'series'], {
    invalid_type_error: 'Type is invalid.',
    required_error: 'Type is required.',
  }),

  stars: zod.preprocess(
    (value) => (isNumber(value) ? Number(value) : value),
    zod
      .number({
        required_error: 'Stars is required.',
        invalid_type_error: 'Stars must be a number.',
      })
      .min(0, 'Stars must not be less than 0.')
      .max(10, 'Stars must not be greater than 10.'),
  ),

  releaseDate: zod.preprocess(
    preProcessDate,
    zod.date({
      required_error: 'ReleaseDate is required.',
      invalid_type_error: 'Invalid date.',
    }),
  ),

  uploadDate: zod.preprocess(
    preProcessDate,
    zod.date({
      required_error: 'UploadDate is required.',
      invalid_type_error: 'Invalid date.',
    }),
  ),

  isSpecial: zod.preprocess(
    preProcessBoolean,
    zod.boolean({
      required_error: 'IsSpecial is required.',
      invalid_type_error: 'IsSpecial must be a boolean.',
    }),
  ),

  specialExpire: zod.preprocess(
    preProcessDate,
    zod.date({
      required_error: 'SpecialExpire date is required.',
      invalid_type_error: 'Invalid date.',
    }),
  ),

  triler: zod
    .string({ required_error: 'Triler is required.' })
    .url('Invalid triler url.'),

  video: zod.string().url('Invalid triler url.').optional(),

  mainCategory: zod
    .string({
      required_error: 'Main category is required.',
      invalid_type_error: 'Invalid category.',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category.'),

  categories: zod.preprocess(
    preProcessArray,
    zod
      .array(
        zod
          .string({ invalid_type_error: 'Invalid category item.' })
          .regex(/^[0-9a-fA-F]{24}$/, 'Invalid category item.'),
        {
          required_error: 'Categories is required.',
          invalid_type_error: 'Categories must be an array.',
        },
      )
      .min(1, 'Categories must have at least one category.')
      .max(15, 'Categories must not have more than 15 category.'),
  ),

  actors: zod.preprocess(
    preProcessArray,
    zod
      .array(
        zod
          .string({ invalid_type_error: 'Invalid actor item.' })
          .regex(/^[0-9a-fA-F]{24}$/, 'Invalid actor item.'),
        {
          required_error: 'Actors is required.',
          invalid_type_error: 'Actors must be an array.',
        },
      )
      .min(1, 'Actors must have at least one actor.')
      .max(50, 'Actors must not have more than 50 actor.'),
  ),

  directors: zod.preprocess(
    preProcessArray,
    zod
      .array(
        zod
          .string({ invalid_type_error: 'Invalid director item.' })
          .regex(/^[0-9a-fA-F]{24}$/, 'Invalid director item.'),
        {
          required_error: 'Directors is required.',
          invalid_type_error: 'Directors must be an array.',
        },
      )
      .min(1, 'Directors must have at least one director.')
      .max(5, 'Directors must not have more than 5 director.'),
  ),

  writers: zod.preprocess(
    preProcessArray,
    zod
      .array(
        zod
          .string({ invalid_type_error: 'Invalid writer item.' })
          .regex(/^[0-9a-fA-F]{24}$/, 'Invalid writer item.'),
        {
          required_error: 'Writers is required.',
          invalid_type_error: 'Writers must be an array.',
        },
      )
      .min(1, 'Writers must have at least one writer.')
      .max(5, 'Writers must not have more than 5 writer.'),
  ),
};

export let addVideoSchema = zod.object({
  body: zod.object({ ...video }),
});

export let deleteVideoSchema = zod.object({
  params: zod.object({
    _id: _idSchema,
  }),
});

export let editVideoSchema = zod.object({
  params: zod.object({
    _id: _idSchema,
  }),
  body: zod.object({ ...video }),
});

export let getVideoSchema = zod.object({
  params: zod.object({
    _id: _idSchema,
  }),
});

export let getMoviesSchema = zod.object({
  query: zod.object({
    categoryId: _idSchema.optional(),
  }),
});

export let getSeriesSchema = zod.object({
  query: zod.object({
    categoryId: _idSchema.optional(),
  }),
});

export let searchSchema = zod.object({
  query: zod.object({
    title: video.title.optional(),
    type: video.type.optional(),
    category: _idSchema.optional(),
    year: zod
      .string({ invalid_type_error: 'Year must be a string.' })
      .regex(/^[0-9]{4},[0-9]{4}$/)
      .optional(),
    stars: video.stars.optional(),
  }),
});

export type AddVideoSchema = TypeOf<typeof addVideoSchema>;
export type DeleteVideoSchema = TypeOf<typeof deleteVideoSchema>;
export type EditVideoSchema = TypeOf<typeof editVideoSchema>;
export type GetVideoSchema = TypeOf<typeof getVideoSchema>;
export type GetMoviesSchema = TypeOf<typeof getMoviesSchema>;
export type GetSeriesSchema = TypeOf<typeof getSeriesSchema>;
export type SearchSchema = TypeOf<typeof searchSchema>;
