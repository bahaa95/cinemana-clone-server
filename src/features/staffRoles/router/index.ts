import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { validateResource } from '@/middleware/validateResource';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { IStaffRoleController } from '../controller';
import { addRoleSchema, editRoleSchema, deleteRoleSchema } from '../validation';
import { AdministratorRoles } from '@/features/administrators';

export class StaffRoleRouter extends Router<IStaffRoleController> {
  constructor(staffRoleController: IStaffRoleController) {
    super('/admin/dashboard/staff/roles', staffRoleController);
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    // new role
    this.router.post(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(addRoleSchema),
      this.controller.addRole,
    );

    // edit role
    this.router.put(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(editRoleSchema),
      this.controller.editRole,
    );

    // delete role
    this.router.delete(
      `${this.path}/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin, AdministratorRoles.Data_Admin),
      validateResource(deleteRoleSchema),
      this.controller.deleteRole,
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
      this.controller.getRoles,
    );
  }
}
