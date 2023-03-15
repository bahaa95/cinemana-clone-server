import zod, { TypeOf } from 'zod';
import { isBoolean } from '@/utils/isBoolean';
import { jsonParse } from '@/utils/jsonParse';

let history = {
  videoId: zod
    .string({
      required_error: 'VideoId required.',
      invalid_type_error: 'Invalid videoId.',
    })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid videoId.'),

  favorite: zod.preprocess(
    (value) => (isBoolean(value) ? jsonParse(value) : value),
    zod
      .boolean({ invalid_type_error: 'Favorite must be boolean type.' })
      .optional(),
  ),

  watchList: zod.preprocess(
    (value) => (isBoolean(value) ? jsonParse(value) : value),
    zod
      .boolean({ invalid_type_error: 'WatchList must be boolean type.' })
      .optional(),
  ),
};

export let editHistorySchema = zod.object({
  query: zod.object({
    videoId: history.videoId,
  }),

  body: zod.object({
    favorite: history.favorite,
    watchList: history.watchList,
  }),
});

export type EditHistorySchema = TypeOf<typeof editHistorySchema>;
