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

export class AdminstratorRouter extends Router<IAdminstratorController> {
  constructor(adminstratorController: IAdminstratorController) {
    super('/admin/dashboard/adminstrators', adminstratorController);
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    // signup
    this.router.post(
      `${this.path}/signup`,
      limiter({ max: 6, windowMs: 1000 * 60 * 60 }),
      validateResource(signupSchema),
      this.controller.emailMustNotExistBefore,
      this.controller.signup,
    );

    // signin
    this.router.post(
      `${this.path}/signin`,
      limiter({ max: 10, windowMs: 1000 * 60 * 60 }),
      validateResource(signinSchema),
      this.controller.isEmailExist,
      this.controller.comparePassword,
      this.controller.isAccountActivated,
      this.controller.signin,
    );

    // edit account
    this.router.patch(
      `${this.path}/editAccount/:_id`,
      limiter({ max: 15, windowMs: 1000 * 60 * 60 }),
      verifyJwt,
      validateResource(editAccountSchema),
      this.controller.editAccount,
    );

    // toggle account activation
    this.router.patch(
      `${this.path}/activation/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin),
      validateResource(toggleActivationSchema),
      this.controller.toggleActivated,
    );

    // edit roles
    this.router.patch(
      `${this.path}/roles/:_id`,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin),
      validateResource(editRolesSchema),
      this.controller.editRoles,
    );

    // get accounts
    this.router.get(
      this.path,
      verifyJwt,
      verifyRoles(AdministratorRoles.Admin),
      this.controller.getAccounts,
    );

    // refresh token
    this.router.post(`${this.path}/refreshToken`, this.controller.refreshToken);
  }
}
