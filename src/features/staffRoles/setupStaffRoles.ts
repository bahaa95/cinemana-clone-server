import { IRouter } from 'express';
import { StaffRoleRouter } from './router';
import { StaffRoleController } from './controller';
import { StaffRoleService } from './service';
import { StaffRole } from './model';

export function setupStaffRoles(): IRouter {
  const router = new StaffRoleRouter(
    new StaffRoleController(new StaffRoleService(StaffRole)),
  );

  return router.getRoutes();
}
