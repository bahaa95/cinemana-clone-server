import { IRouter, Router as router } from 'express';
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

export class EpisodeRouter extends Router {
  protected path = '/admin/dashboard/episode';
  protected router: IRouter;
  private readonly episodesController: IEpisodeController;

  constructor(_epidoesController: IEpisodeController) {
    super();
    this.router = router();
    this.episodesController = _epidoesController;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
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
      this.episodesController.addEpisode,
    );

    // * edit episode
    this.router.patch(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      handleSingleImage('image'),
      validateResource(editEpisodeSchema),
      this.episodesController.editEpisode,
    );

    // * delete episode
    this.router.delete(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteEpisodeSchema),
      this.episodesController.deleteEpisode,
    );
  }
}