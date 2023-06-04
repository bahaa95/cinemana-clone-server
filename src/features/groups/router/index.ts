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

export class GroupRouter extends Router<IGroupController> {
  constructor(groupController: IGroupController) {
    super('/groups', groupController);
    this.initializeRoutes();
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
      this.controller.addGroup,
    );

    // edit group
    this.router.patch(
      `/admin/dashboard${this.path}/_id/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editGroupSchema),
      this.controller.editGroup,
    );

    // delete group
    this.router.delete(
      `/admin/dashboard${this.path}/_id/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteGroupSchema),
      this.controller.deleteGroup,
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
      this.controller.getGroups,
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
      this.controller.getGroupWithVideos,
    );

    /**
     * * client routes
     */

    // get group with videos
    this.router.get(
      `${this.path}/_id/:_id`,
      limiter(),
      validateResource(getGroupAndVideosSchema),
      this.controller.getGroupWithVideos,
    );

    // get groups with videos
    this.router.get(
      `${this.path}`,
      limiter({ max: 100 }),
      this.controller.getGroupsWithVideos,
    );
  }
}
