import { HydratedDocument, Model } from 'mongoose';
import { ObjectId, Copy } from '@/types';

export interface History {
  id: string;
  userId: ObjectId;
  videoId: ObjectId;
  favorite: boolean;
  watchList: boolean;
}

export type HistoryDocument = Copy<HydratedDocument<History>>;

export type HistoryModel = Model<History>;
