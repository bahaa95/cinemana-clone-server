import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { limiter } from '@/middleware/limiter';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { handleImages } from '@/middleware/handleUploadedFiles';
import { ValidateFiles } from '@/middleware/validateFile';
import { validateResource } from '@/middleware/validateResource';
import { IVideoController } from '../controller';
import {
  addVideoSchema,
  deleteVideoSchema,
  editVideoSchema,
  getVideoSchema,
  getMoviesSchema,
  getSeriesSchema,
  searchSchema,
} from '../validation/validation';
import { AdministratorRoles } from '@/features/administrators';

export class VideoRouter extends Router {
  protected path = '';
  protected router: IRouter;
  private readonly videoController: IVideoController;

  constructor(_videoController: IVideoController) {
    super();
    this.router = router();
    this.videoController = _videoController;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }
  protected initializeRoutes(): void {
    /**
     * * dashbord
     */

    // add new video
    this.router.post(
      '/admin/dashboard/videos',
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      handleImages([
        { name: 'poster', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
      ]),
      ValidateFiles('poster', 'cover'),
      validateResource(addVideoSchema),
      this.videoController.addVideo,
    );

    // delete video
    this.router.delete(
      '/admin/dashboard/videos/:_id',
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteVideoSchema),
      this.videoController.deleteVideo,
    );

    // edit video
    this.router.patch(
      '/admin/dashboard/videos/:_id',
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      handleImages([
        { name: 'poster', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
      ]),
      validateResource(editVideoSchema),
      this.videoController.editVideo,
    );

    // get video
    this.router.get(
      '/admin/dashboard/videos/:_id',
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      validateResource(getVideoSchema),
      this.videoController.getVideo,
    );

    /**
     * * client
     */

    // get video
    this.router.get(
      '/video/_id/:_id',
      limiter(),
      validateResource(getVideoSchema),
      this.videoController.getVideo,
    );

    // get movies
    this.router.get(
      '/movies',
      limiter(),
      validateResource(getMoviesSchema),
      this.videoController.getMovies,
    );

    // get series
    this.router.get(
      '/series',
      limiter(),
      validateResource(getSeriesSchema),
      this.videoController.getSeries,
    );

    // get special videos
    this.router.get(
      '/specials',
      limiter({ max: 100 }),
      this.videoController.getSpecialVideos,
    );

    // search
    this.router.get(
      '/search',
      limiter({ max: 1000 }),
      validateResource(searchSchema),
      this.videoController.searchVideo,
    );
  }
}
