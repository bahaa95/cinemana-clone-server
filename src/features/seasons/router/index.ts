import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { limiter } from '@/middleware/limiter';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { AdministratorRoles } from '@/features/administrators';
import { validateResource } from '@/middleware/validateResource';
import { ISeasonController } from '../controller';
import {
  addSeasonSchema,
  editSeasonSchema,
  deleteSeasonSchema,
} from '../validation';

export class SeasonRouter extends Router {
  protected readonly path = '/admin/dashboard/season';
  protected readonly router: IRouter;
  private readonly seasonController: ISeasonController;

  constructor(_seasonController: ISeasonController) {
    super();
    this.seasonController = _seasonController;
    this.router = router();
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    // * add new season
    this.router.post(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(addSeasonSchema),
      this.seasonController.mustBeSeries,
      this.seasonController.addSeason,
    );

    // * edit season
    this.router.patch(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editSeasonSchema),
      this.seasonController.editSeason,
    );

    // * delete season
    this.router.delete(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteSeasonSchema),
      this.seasonController.deleteSeason,
    );

    // * get all seasons
    this.router.get(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      this.seasonController.getSeasons,
    );
  }
}
