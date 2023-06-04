import { Router } from '@/static/router';
import { validateResource } from '@/middleware/validateResource';
import { limiter } from '@/middleware/limiter';
import { verifyJwt } from '@/middleware/verifyJwt';
import { IUserController } from '../controller';
import { signupSchema, signinSchema } from '../vlaidation';

export class UserRouter extends Router<IUserController> {
  constructor(usersController: IUserController) {
    super('/users', usersController);
    this.initializeRoutes();
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
      this.controller.signUp,
    );

    // signin
    this.router.post(
      `${this.path}/signIn`,
      limiter({
        max: 10,
        windowMs: 1000 * 60 * 60,
      }),
      validateResource(signinSchema),
      this.controller.signIn,
    );

    // log out
    this.router.post(
      `${this.path}/logOut`,
      limiter({
        max: 10,
        windowMs: 1000 * 60 * 60,
      }),
      verifyJwt,
      this.controller.logOut,
    );

    // refresh token
    this.router.post(
      `${this.path}/refreshToken`,
      limiter({
        max: 60,
        windowMs: 1000 * 60 * 20,
      }),
      this.controller.refreshToken,
    );
  }
}
