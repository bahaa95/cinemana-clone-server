import { HydratedDocument, Model } from 'mongoose';
import { ObjectId, Copy, File } from '@/types';

export interface Episode {
  videoId: ObjectId;
  seasonId: ObjectId;
  episode: number;
  duration: number;
  image: File;
  video: string;
}

export type EpisodeDocument = Copy<HydratedDocument<Episode>>;

export type EpisodeModel = Model<Episode>;
