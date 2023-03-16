import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { validateResource } from '@/middleware/validateResource';
import { verifyJwt } from '@/middleware/verifyJwt';
import { verifyRoles } from '@/middleware/verifyRoles';
import { limiter } from '@/middleware/limiter';
import { IAdminstratorController } from '../controller';
import {
  signupSchema,
  signinSchema,
  editAccountSchema,
  toggleActivationSchema,
  editRolesSchema,
} from '../validation';
import { AdministratorRoles } from '../roles';

export class AdminstratorRouter extends Router {
  protected readonly path = '/admin/dashboard/adminstrators';
  protected readonly router: IRouter;
  private readonly adminstratorController: IAdminstratorController;

  constructor(_adminstratorController: IAdminstratorController) {
    super();
    this.router = router();
    this.adminstratorController = _adminstratorController;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    // signup
    this.router.post(
      `${this.path}/signup`,
      limiter({ max: 6, windowMs: 1000 * 60 * 60 }),
      validateResource(signupSchema),
      this.adminstratorController.emailMustNotExistBefore,
      this.adminstratorController.signup,
    );

    // signin
    this.router.post(
      `${this.path}/signin`,
      limiter({ max: 10, windowMs: 1000 * 60 * 60 }),
      validateResource(signinSchema),
      this.adminstratorController.isEmailExist,
      this.adminstratorController.comparePassword,
      this.adminstratorController.isAccountActivated,
      this.adminstratorController.signin,
    );

    // edit account
    this.router.patch(
      `${this.path}/editAccount/:_id`,
      limiter({ max: 15, windowMs: 1000 * 60 * 60 }),
      verifyJwt,
      validateResource(editAccountSchema),
      this.adminstratorController.editAccount,
    );

    // toggle account activation
    this.router.patch(
      `${this.path}/activation/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin),
      validateResource(toggleActivationSchema),
      this.adminstratorController.toggleActivated,
    );

    // edit roles
    this.router.patch(
      `${this.path}/roles/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin),
      validateResource(editRolesSchema),
      this.adminstratorController.editRoles,
    );

    // get accounts
    this.router.get(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin),
      this.adminstratorController.getAccounts,
    );

    // refresh token
    this.router.post(
      `${this.path}/refreshToken`,
      this.adminstratorController.refreshToken,
    );
  }
}
