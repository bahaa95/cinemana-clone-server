import { IRouter } from 'express';
import { SeasonService, Season } from '@/features/seasons';
import { EpisodeService, Episode } from '@/features/episodes';
import { VideoRouter } from './router';
import { VideoController } from './controller';
import { VideoService } from './service';
import { Video } from './model';

export function setupVideos(): IRouter {
  const router = new VideoRouter(
    new VideoController(
      new VideoService(Video),
      new SeasonService(Season),
      new EpisodeService(Episode),
    ),
  );

  return router.getRoutes();
}
