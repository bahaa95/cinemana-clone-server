import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { validateResource } from '@/middleware/validateResource';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { IStaffRoleController } from '../controller';
import { addRoleSchema, editRoleSchema, deleteRoleSchema } from '../validation';
import { AdministratorRoles } from '@/features/administrators';

export class StaffRoleRouter extends Router {
  protected readonly path = '/admin/dashboard/staff/roles';
  protected readonly router: IRouter;
  private readonly staffRoleController: IStaffRoleController;

  constructor(_controller: IStaffRoleController) {
    super();
    this.router = router();
    this.staffRoleController = _controller;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    // new role
    this.router.post(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(addRoleSchema),
      this.staffRoleController.addRole,
    );

    // edit role
    this.router.put(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editRoleSchema),
      this.staffRoleController.editRole,
    );

    // delete role
    this.router.delete(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteRoleSchema),
      this.staffRoleController.deleteRole,
    );

    // get roles
    this.router.get(
      this.path,
      verifyJwt,
      verifyRoles(
        AdministratorRoles.Admin,
        AdministratorRoles.Data_Admin,
        AdministratorRoles.Viewers,
      ),
      this.staffRoleController.getRoles,
    );
  }
}
