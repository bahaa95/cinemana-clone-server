import { Router } from '@/static/router';
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

export class SeasonRouter extends Router<ISeasonController> {
  constructor(seasonController: ISeasonController) {
    super('/admin/dashboard/seasons', seasonController);
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    // * add new season
    this.router.post(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(addSeasonSchema),
      this.controller.mustBeSeries,
      this.controller.addSeason,
    );

    // * edit season
    this.router.patch(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editSeasonSchema),
      this.controller.editSeason,
    );

    // * delete season
    this.router.delete(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteSeasonSchema),
      this.controller.deleteSeason,
    );

    // * get all seasons
    this.router.get(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      this.controller.getSeasons,
    );
  }
}
