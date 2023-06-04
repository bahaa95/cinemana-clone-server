import { Router } from '@/static/router';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { handleSingleImage } from '@/middleware/handleUploadedFiles';
import { ValidateFile } from '@/middleware/validateFile';
import { validateResource } from '@/middleware/validateResource';
import { IEpisodeController } from '../controller';
import {
  addEpisodeSchema,
  editEpisodeSchema,
  deleteEpisodeSchema,
} from '../validation';
import { AdministratorRoles } from '@/features/administrators';

export class EpisodeRouter extends Router<IEpisodeController> {
  constructor(epidoesController: IEpisodeController) {
    super('/admin/dashboard/episodes', epidoesController);
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    // * add new episode
    this.router.post(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      handleSingleImage('image'),
      ValidateFile('There is no image file. please upload image for episode.'),
      validateResource(addEpisodeSchema),
      this.controller.addEpisode,
    );

    // * edit episode
    this.router.patch(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      handleSingleImage('image'),
      validateResource(editEpisodeSchema),
      this.controller.editEpisode,
    );

    // * delete episode
    this.router.delete(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteEpisodeSchema),
      this.controller.deleteEpisode,
    );
  }
}
