import { HydratedDocument, Model } from 'mongoose';
import { ObjectId, Copy, Combine } from '@/types';
import { VideoListItem } from '@/features/videos';

export interface Group {
  title: string;
  videos: ObjectId[];
}

export type GroupDocument = Copy<
  Combine<
    Omit<HydratedDocument<Group>, 'videos'>,
    {
      videos: VideoListItem[];
    }
  >
>;

export type GroupModel = Model<Group>;
