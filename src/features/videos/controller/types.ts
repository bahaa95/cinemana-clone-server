import { ExpressFile } from '@/types';
import { Middleware } from '@/types';

export interface VideoController {
  addVideo: Middleware;
  deleteVideo: Middleware;
  editVideo: Middleware;
  getVideo: Middleware;
  getMovies: Middleware;
  getSeries: Middleware;
  getSpecialVideos: Middleware;
  searchVideo: Middleware;
}

export type VideoFiles = {
  poster: ExpressFile[];
  cover: ExpressFile[];
};