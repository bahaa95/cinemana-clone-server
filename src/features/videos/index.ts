import { IRouter } from 'express';
import { VideoRouter } from './router';
import { VideoController } from './controller';
import { VideoService } from './service';
import { Video } from './model';

export function setupVideos(): IRouter {
  const router = new VideoRouter(new VideoController(new VideoService(Video)));

  return router.getRoutes();
}
