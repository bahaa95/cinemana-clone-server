import { IRouter } from 'express';
import { AdminstratorRouter } from './router';
import { AdminstratorController } from './controller';
import { AdministratorService } from './service';
import { Administrator } from './model';

export function setupAdministrators(): IRouter {
  const router = new AdminstratorRouter(
    new AdminstratorController(new AdministratorService(Administrator)),
  );

  return router.getRoutes();
}
