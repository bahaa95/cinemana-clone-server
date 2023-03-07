import { Middleware } from '@/types';

export interface SeasonController {
  addSeason: Middleware;
  editSeason: Middleware;
  deleteSeason: Middleware;
  getSeasons: Middleware;
  mustBeSeries: Middleware;
}
