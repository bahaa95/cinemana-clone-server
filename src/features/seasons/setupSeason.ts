import { IRouter } from 'express';
import { VideoService, Video } from '@/features/videos';
import { EpisodeService, Episode } from '@/features/episodes';
import { Season } from './model';
import { SeasonService } from './service';
import { SeasonController } from './controller';
import { SeasonRouter } from './router';

export function setupSeasons(): IRouter {
  const router = new SeasonRouter(
    new SeasonController(
      new SeasonService(Season),
      new VideoService(Video),
      new EpisodeService(Episode),
    ),
  );

  return router.getRoutes();
}
