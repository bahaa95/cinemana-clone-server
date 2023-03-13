import zod, { TypeOf } from 'zod';
import { isArray } from '@/utils/isArray';
import { jsonParse } from '@/utils/jsonParse';
import { idSchema } from '@/static/validationSchema';

let group = {
  title: zod
    .string({
      invalid_type_error: 'Title must be a string type.',
      required_error: 'Title is required.',
    })
    .trim()
    .min(1, 'Title is required.')
    .max(50, 'Title must not be greater than 50 characters.')
    .regex(/^[a-zA-Z\s]+$/, 'Use only [a-z, A-Z, spaces] characters in title.'),

  videos: zod.preprocess(
    (value) => (isArray(value) ? jsonParse(value) : value),
    zod
      .array(
        zod
          .string({ invalid_type_error: 'Invalid video _id.' })
          .regex(/^[0-9a-fA-F]{24}$/, 'Invalid video _id.'),
        {
          required_error: 'Videos is required.',
          invalid_type_error: 'Videos must be an array.',
        },
      )
      .min(1, 'Videos must have at least one category.')
      .max(100, 'Categories must not have more than 15 category.'),
  ),
};

let params = {
  _id: idSchema,
};

export let addGroupSchema = zod.object({
  body: zod.object({ ...group }),
});

export let editGroupSchema = zod.object({
  params: zod.object({ _id: params._id }),
  body: zod.object({ ...group }),
});

export let deleteGroupSchema = zod.object({
  params: zod.object({ _id: params._id }),
});

export let getGroupAndVideosSchema = zod.object({
  params: zod.object({ _id: params._id }),
});

export type AddGroupSchema = TypeOf<typeof addGroupSchema>;
export type EditGroupSchema = TypeOf<typeof editGroupSchema>;
export type DeleteGroupSchema = TypeOf<typeof deleteGroupSchema>;
