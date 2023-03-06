import { jsonParse } from '@/utils/jsonParse';
import { AddVideoSchema } from '../../validation';
import { IVideo } from '../../model';
import { ObjectId } from '@/types';

export function jsonParseVideo(video: AddVideoSchema['body']): IVideo {
  const {
    isPublic,
    stars,
    releaseDate,
    uploadDate,
    isSpecial,
    specialExpire,
    categories,
    actors,
    directors,
    writers,
    description,
    mainCategory,
    title,
    triler,
    type,
    video: videoUrl,
    ...props
  } = video;

  return {
    isPublic: jsonParse(isPublic),
    stars: Number(stars),
    releaseDate: new Date(releaseDate),
    uploadDate: new Date(uploadDate),
    isSpecial: jsonParse(isSpecial),
    specialExpire: new Date(specialExpire),
    categories: jsonParse<ObjectId[]>(categories as unknown as string),
    actors: jsonParse<ObjectId[]>(actors as unknown as string),
    directors: jsonParse<ObjectId[]>(directors as unknown as string),
    writers: jsonParse<ObjectId[]>(writers as unknown as string),
    description,
    mainCategory,
    title,
    triler,
    type,
    video: videoUrl,
  } as unknown as IVideo;
}
