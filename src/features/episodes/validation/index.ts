import zod, { TypeOf } from 'zod';
import { idSchema } from '@/static/validationSchema';
import { isNumber } from '@/utils/isNumber';

let episodeSchema = {
  videoId: zod
    .string({
      required_error: 'VideoId is required.',
    })
    .trim()
    .min(12, 'Invalid videoId.')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid videoId.'),

  seasonId: zod
    .string({
      required_error: 'SeasonId is required.',
    })
    .trim()
    .min(12, 'Invalid seasonId.')
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid seasonId.'),

  episode: zod.preprocess(
    (value) => (isNumber(value) ? Number(value) : value),
    zod
      .number({
        required_error: 'Episode number is required.',
        invalid_type_error: 'Episode must be a number.',
      })
      .min(1, 'Episode number must not be less than 1.')
      .max(50000, 'Episode number must not be greater than 50000.'),
  ),

  duration: zod.preprocess(
    (value) => (isNumber(value) ? Number(value) : value),
    zod
      .number({
        required_error: 'Duration number is required.',
        invalid_type_error: 'Duration must be a number.',
      })
      .min(180, 'Duration number must not be less than 180 second.')
      .max(36000, 'Duration number must not be greater than 36000 second.'),
  ),

  video: zod
    .string({
      required_error: 'Video url is required.',
      invalid_type_error: 'Video must be a string.',
    })
    .url('Invalid url.'),
};

export let addEpisodeSchema = zod.object({
  body: zod.object({ ...episodeSchema }),
});

export let editEpisodeSchema = zod.object({
  params: zod.object({ _id: idSchema }),
  body: zod.object({
    duration: episodeSchema.duration,
    video: episodeSchema.video,
  }),
});

export let deleteEpisodeSchema = zod.object({
  params: zod.object({ _id: idSchema }),
});

export type AddEpisodeSchema = TypeOf<typeof addEpisodeSchema>;
export type EditEpisodeSchema = TypeOf<typeof editEpisodeSchema>;
export type DeleteEpisodeSchema = TypeOf<typeof deleteEpisodeSchema>;
