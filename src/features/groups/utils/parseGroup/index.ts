import { jsonParse } from '@/utils/jsonParse';
import { ObjectId } from '@/types';
import { AddGroupSchema } from '../../validation';
import { IGroup } from '../../model';

export function parseGroup(group: AddGroupSchema['body']): IGroup {
  let { title, videos } = group;

  return {
    title,
    videos: jsonParse<ObjectId[]>(videos as unknown as string),
  };
}
