import { EpisodeRouter } from './router';
import { EpisodeController } from './controller';
import { EpisodeService } from './service';
import { Episode } from './model';
import { IRouter } from 'express';

export function setupEpisodes(): IRouter {
  let router = new EpisodeRouter(
    new EpisodeController(new EpisodeService(Episode)),
  );

  return router.getRoutes();
}
