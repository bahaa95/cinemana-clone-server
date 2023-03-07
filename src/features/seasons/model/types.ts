import { HydratedDocument, Model } from 'mongoose';
import { Copy, ObjectId } from '@/types';

export interface Season {
  videoId: ObjectId;
  season: number;
}

export type SeasonDocument = Copy<HydratedDocument<Season>>;
export type SeasonModel = Model<Season>;
