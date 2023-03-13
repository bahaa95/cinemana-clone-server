import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { limiter } from '@/middleware/limiter';
import { validateResource } from '@/middleware/validateResource';
import { AdministratorRoles } from '@/features/administrators';
import { IGroupController } from '../controller';
import {
  addGroupSchema,
  editGroupSchema,
  deleteGroupSchema,
  getGroupAndVideosSchema,
} from '../validation';

export class GroupRouter extends Router {
  protected path = '/groups';
  protected router: IRouter;
  private readonly groupController: IGroupController;

  constructor(_groupController: IGroupController) {
    super();
    this.router = router();
    this.groupController = _groupController;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    /**
     * * dashboard routes
     */

    // add new group
    this.router.post(
      `/admin/dashboard${this.path}`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(addGroupSchema),
      this.groupController.addGroup,
    );

    // edit group
    this.router.patch(
      `/admin/dashboard${this.path}/_id/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editGroupSchema),
      this.groupController.editGroup,
    );

    // delete group
    this.router.delete(
      `/admin/dashboard${this.path}/_id/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteGroupSchema),
      this.groupController.deleteGroup,
    );

    // get groups
    this.router.get(
      `/admin/dashboard${this.path}`,
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      this.groupController.getGroups,
    );

    // get group with video
    this.router.get(
      `/admin/dashboard${this.path}/_id/:_id`,
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      this.groupController.getGroupWithVideos,
    );

    /**
     * * client routes
     */

    // get group with videos
    this.router.get(
      `${this.path}/_id/:_id`,
      limiter(),
      validateResource(getGroupAndVideosSchema),
      this.groupController.getGroupWithVideos,
    );

    // get groups with videos
    this.router.get(
      `${this.path}`,
      limiter({ max: 100 }),
      this.groupController.getGroupsWithVideos,
    );
  }
}
