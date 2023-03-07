import { IRouter } from 'express';
import { VideoRouter } from './router';
import { VideoController } from './controller';
import { VideoService, IVideoService } from './service';
import { Video } from './model';

function setupVideos(): IRouter {
  const router = new VideoRouter(new VideoController(new VideoService(Video)));

  return router.getRoutes();
}

export { setupVideos, Video, VideoService, IVideoService };
