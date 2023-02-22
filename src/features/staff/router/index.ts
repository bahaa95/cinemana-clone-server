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
      this.path,
      handleSingleImage('image'),
      ValidateFile(),
      validateResource(addStaffSchema),
      this.staffController.addPerson,
    );

    // edit person
    this.router.patch(
      `${this.path}/:_id`,
      handleSingleImage('image'),
      validateResource(editStaffSchema),
      this.staffController.editPerson,
    );

    // delete person
    this.router.delete(
      `${this.path}/:_id`,
      validateResource(deleteStaffSchema),
      this.staffController.deletePerson,
    );

    // get staff
    this.router.get(this.path, this.staffController.getStaff);

    // get staff by role
    this.router.get(
      `${this.path}/roleId/:roleId`,
      validateResource(getStaffByRoleSchema),
      this.staffController.getStaffByRole,
    );
  }
}
