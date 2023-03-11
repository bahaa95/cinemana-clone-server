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
    query: VideoFilterQuery,
  ) => Promise<VideoDocument | null>;

  getSimilarVideos: (query: VideoFilterQuery) => Promise<VideoList>;

  getMovies: (query?: VideoFilterQuery) => Promise<VideoList>;

  getSeries: (query?: VideoFilterQuery) => Promise<VideoList>;

  getSpecialVideos: () => Promise<SpecialVideo[]>;

  searchVideo: (query?: VideoFilterQuery) => Promise<VideoList>;

  getBasicVideoDocument: (_id: ObjectId) => Promise<BasicVideoDocument | null>;

  getVideoListItem: (_id: ObjectId) => Promise<VideoListItem | null>;
}

export type VideoFilterQuery = FilterQuery<IVideo>;
