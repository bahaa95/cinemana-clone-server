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

export class VideoRouter extends Router<IVideoController> {
  constructor(videoController: IVideoController) {
    super('', videoController);
    this.initializeRoutes();
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
      this.controller.addVideo,
    );

    // delete video
    this.router.delete(
      '/admin/dashboard/videos/:_id',
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteVideoSchema),
      this.controller.deleteVideo,
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
      this.controller.editVideo,
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
      this.controller.getVideo,
    );

    /**
     * * client
     */

    // get video
    this.router.get(
      '/video/_id/:_id',
      limiter(),
      validateResource(getVideoSchema),
      this.controller.getVideo,
    );

    // get movies
    this.router.get(
      '/movies',
      limiter(),
      validateResource(getMoviesSchema),
      this.controller.getMovies,
    );

    // get series
    this.router.get(
      '/series',
      limiter(),
      validateResource(getSeriesSchema),
      this.controller.getSeries,
    );

    // get special videos
    this.router.get(
      '/specials',
      limiter({ max: 100 }),
      this.controller.getSpecialVideos,
    );

    // search
    this.router.get(
      '/search',
      limiter({ max: 1000 }),
      validateResource(searchSchema),
      this.controller.searchVideo,
    );
  }
}
