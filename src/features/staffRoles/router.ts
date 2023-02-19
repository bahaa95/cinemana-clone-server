import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { validateResource } from '@/middleware/validateResource';
import { StaffRoleController } from './types';
import { addRoleSchema, editRoleSchema, deleteRoleSchema } from './validation';

export class StaffRoleRouter extends Router {
  protected readonly path = '/staff/roles';
  protected readonly router: IRouter;
  private readonly controller: StaffRoleController;

  constructor(_controller: StaffRoleController) {
    super();
    this.router = router();
    this.controller = _controller;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    // new role
    this.router.post(
      this.path,
      validateResource(addRoleSchema),
      this.controller.isAlreadyExist,
      this.controller.addRole,
    );

    // edit role
    this.router.put(
      `${this.path}/:_id`,
      validateResource(editRoleSchema),
      this.controller.isAlreadyExist,
      this.controller.editRole,
    );

    // delete role
    this.router.delete(
      `${this.path}/:_id`,
      validateResource(deleteRoleSchema),
      this.controller.deleteRole,
    );

    // get roles
    this.router.get(this.path, this.controller.getRoles);
  }
}
