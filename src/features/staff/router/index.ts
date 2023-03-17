import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { handleSingleImage } from '@/middleware/handleUploadedFiles';
import { ValidateFile } from '@/middleware/validateFile';
import { validateResource } from '@/middleware/validateResource';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { limiter } from '@/middleware/limiter';
import { IStaffController } from '../controller';
import {
  addStaffSchema,
  deleteStaffSchema,
  editStaffSchema,
  getStaffByRoleSchema,
  getPersonAndVideosSchema,
  getPersonSchema,
} from '../validation';
import { AdministratorRoles } from '@/features/administrators';

export class StaffRouter extends Router {
  protected readonly path = '/staff/person';
  protected readonly router: IRouter;
  private readonly staffController: IStaffController;

  constructor(_staffController: IStaffController) {
    super();
    this.router = router();
    this.staffController = _staffController;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    /**
     * * dashboard
     */
    // add person to staff
    this.router.post(
      `/admin/dashboard${this.path}`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      handleSingleImage('image'),
      ValidateFile(),
      validateResource(addStaffSchema),
      this.staffController.addPerson,
    );

    // edit person
    this.router.patch(
      `/admin/dashboard${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      handleSingleImage('image'),
      validateResource(editStaffSchema),
      this.staffController.editPerson,
    );

    // delete person
    this.router.delete(
      `/admin/dashboard${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteStaffSchema),
      this.staffController.deletePerson,
    );

    // get staff
    this.router.get(
      `/admin/dashboard${this.path}`,
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      this.staffController.getStaff,
    );

    // get staff by role
    this.router.get(
      `/admin/dashboard${this.path}/roleId/:roleId`,
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      validateResource(getStaffByRoleSchema),
      this.staffController.getStaffByRole,
    );

    // get person
    this.router.get(
      `/admin/dashboard${this.path}/search`,
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      validateResource(getPersonSchema),
      this.staffController.getPerson,
    );

    /**
     * * cinemana-client
     */
    // get person and videos
    this.router.get(
      `${this.path}/:_id`,
      limiter(),
      validateResource(getPersonAndVideosSchema),
      this.staffController.getPersonAndVideos,
    );
  }
}
