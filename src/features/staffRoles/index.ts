import { IRouter } from 'express';
import { StaffRoleRouter } from './router';
import { StaffRoleController } from './controler';
import { StaffRoleService } from './service';
import { StaffRole } from './modal';
export { StaffRole } from './types';

export function setupStaffRoles(): IRouter {
  const router = new StaffRoleRouter(
    new StaffRoleController(new StaffRoleService(StaffRole)),
  );

  return router.getRoutes();
}
