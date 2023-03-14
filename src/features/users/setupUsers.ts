import { UserRouter } from './router';
import { UserController } from './controller';
import { UserService } from './service';
import { User } from './model';
import { IRouter } from 'express';

export function setupUsers(): IRouter {
  let router = new UserRouter(new UserController(new UserService(User)));

  return router.getRoutes();
}
