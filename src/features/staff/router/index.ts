import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { handleSingleImage } from '@/middleware/handleUploadedFiles';
import { ValidateFile } from '@/middleware/validateFile';
import { validateResource } from '@/middleware/validateResource';
import { IStaffController } from '../controller';
import {
  addStaffSchema,
  deleteStaffSchema,
  editStaffSchema,
  getStaffByRoleSchema,
  getPersonAndVideosSchema,
} from '../validation';

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
    // add person to staff
    this.router.post(
      `/admin/dashboard${this.path}`,
      handleSingleImage('image'),
      ValidateFile(),
      validateResource(addStaffSchema),
      this.staffController.addPerson,
    );

    // edit person
    this.router.patch(
      `/admin/dashboard${this.path}/:_id`,
      handleSingleImage('image'),
      validateResource(editStaffSchema),
      this.staffController.editPerson,
    );

    // delete person
    this.router.delete(
      `/admin/dashboard${this.path}/:_id`,
      validateResource(deleteStaffSchema),
      this.staffController.deletePerson,
    );

    // get staff
    this.router.get(
      `/admin/dashboard${this.path}`,
      this.staffController.getStaff,
    );

    // get staff by role
    this.router.get(
      `/admin/dashboard${this.path}/roleId/:roleId`,
      validateResource(getStaffByRoleSchema),
      this.staffController.getStaffByRole,
    );

    // get person and videos
    this.router.get(
      `${this.path}/:_id`,
      validateResource(getPersonAndVideosSchema),
      this.staffController.getPersonAndVideos,
    );
  }
}
