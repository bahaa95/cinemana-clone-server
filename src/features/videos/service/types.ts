import { FilterQuery } from 'mongoose';
import { ObjectId } from '@/types';
import { SpecialVideo, VideoList, VideoListItem } from '../types';
import { IVideo, VideoDocument, BasicVideoDocument } from '../model';

export interface VideoService {
  addVideo: (video: IVideo) => Promise<BasicVideoDocument>;

  editVideo: (
    _id: ObjectId,
    video: Partial<IVideo>,
  ) => Promise<VideoListItem | null>;

  deleteVideo: (_id: ObjectId) => Promise<VideoListItem | null>;

  getFullVideoDocument: (
    _id: ObjectId,
    isClient?: boolean,
  ) => Promise<VideoDocument | null>;

  getMovies: (query?: FilterQuery<IVideo>) => Promise<VideoList>;

  getSeries: (query?: FilterQuery<IVideo>) => Promise<VideoList>;

  getSpecialVideos: () => Promise<SpecialVideo[]>;

  searchVideo: (query?: FilterQuery<IVideo>) => Promise<VideoList>;

  getBasicVideoDocument: (_id: ObjectId) => Promise<BasicVideoDocument | null>;

  getVideoListItem: (_id: ObjectId) => Promise<VideoListItem | undefined>;
}

export type VideoFilterQuery = FilterQuery<IVideo>;
