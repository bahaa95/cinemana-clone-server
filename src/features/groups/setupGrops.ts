import { IRouter } from 'express';
import { GroupRouter } from './router';
import { GroupController } from './controller';
import { GroupService } from './service';
import { Group } from './model';

export function setupGroups(): IRouter {
  let router = new GroupRouter(new GroupController(new GroupService(Group)));
  return router.getRoutes();
}
