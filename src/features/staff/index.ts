import { IRouter } from 'express';
import { StaffRouter } from './router';
import { StaffController } from './controller';
import { StaffService } from './service';
import { Staff } from './model';
export type { Person, PersonDocument } from './model';
export { lookupToRolesQuery } from './service/query';

export function setupStaff(): IRouter {
  const router = new StaffRouter(new StaffController(new StaffService(Staff)));

  return router.getRoutes();
}
