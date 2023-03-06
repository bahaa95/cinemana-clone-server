import { HydratedDocument, Model } from 'mongoose';
import { File, ObjectId, Copy, Doc, Combine } from '@/types';
import { ICategory } from '@/features/categories';
import { Person } from '@/features/staff';

export interface Video {
  isPublic: boolean;
  title: string;
  description: string;
  type: 'movie' | 'series';
  stars: number;
  releaseDate: Date;
  uploadDate: Date;
  poster: File;
  cover: File;
  isSpecial: boolean;
  specialExpire: Date;
  triler: string;
  video?: string;
  mainCategory: ObjectId;
  categories: ObjectId[];
  actors: ObjectId[];
  directors: ObjectId[];
  writers: ObjectId[];
}

/**
 * Full video document linked to external documents like staff, categories, ...etc
 */
export type VideoDocument = Copy<
  HydratedDocument<
    Combine<
      Omit<
        Video,
        'mainCategory' | 'categories' | 'actors' | 'directors' | 'writers'
      >,
      {
        mainCategory: Doc<ICategory>;
        categories: Doc<ICategory>[];
        actors: Doc<Person>[];
        directors: Doc<Person>[];
        writers: Doc<Person>[];
      }
    >
  >
>;

/**
 * Basic video document not linked to external documents like staff, categories, ...etc
 */
export type BasicVideoDocument = Copy<HydratedDocument<Video>>;

export type VideoModel = Model<Video>;
