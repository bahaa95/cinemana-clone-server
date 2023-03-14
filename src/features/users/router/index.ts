import { IRouter, Router as router } from 'express';
import { Router } from '@/static/router';
import { validateResource } from '@/middleware/validateResource';
import { limiter } from '@/middleware/limiter';
import { verifyJwt } from '@/middleware/verifyJwt';
import { IUserController } from '../controller';
import { signupSchema, signinSchema } from '../vlaidation';

export class UserRouter extends Router {
  protected path = '/users';
  protected router: IRouter;
  private readonly usersController: IUserController;

  constructor(_usersController: IUserController) {
    super();
    this.router = router();
    this.usersController = _usersController;
    this.initializeRoutes();
  }

  public getRoutes(): IRouter {
    return this.router;
  }

  protected initializeRoutes(): void {
    // signup
    this.router.post(
      `${this.path}/signUp`,
      limiter({
        max: 6,
        windowMs: 1000 * 60 * 60,
      }),
      validateResource(signupSchema),
      this.usersController.signUp,
    );

    // signin
    this.router.post(
      `${this.path}/signIn`,
      limiter({
        max: 10,
        windowMs: 1000 * 60 * 60,
      }),
      validateResource(signinSchema),
      this.usersController.signIn,
    );

    // log out
    this.router.post(
      `${this.path}/logOut`,
      limiter({
        max: 10,
        windowMs: 1000 * 60 * 60,
      }),
      verifyJwt,
      this.usersController.logOut,
    );

    // refresh token
    this.router.post(
      `${this.path}/refreshToken`,
      limiter({
        max: 5,
        windowMs: 1000 * 60 * 60,
      }),
      this.usersController.refreshToken,
    );
  }
}
