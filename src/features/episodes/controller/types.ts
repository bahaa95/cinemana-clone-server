import { Middleware } from '@/types';

export interface EpisodeController {
  addEpisode: Middleware;
  editEpisode: Middleware;
  deleteEpisode: Middleware;
}
