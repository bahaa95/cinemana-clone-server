import { VideoDocument } from '../model';

export type VideoListItem = Pick<
  VideoDocument,
  '_id' | 'poster' | 'title' | 'stars' | 'mainCategory' | 'releaseDate'
>;

export type VideoList = VideoListItem[];

export type SpecialVideo = Pick<
  VideoDocument,
  '_id' | 'cover' | 'title' | 'stars' | 'description'
>;
