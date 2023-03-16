import { Middleware } from '@/types';

export interface StaffRoleController {
  addRole: Middleware;
  editRole: Middleware;
  deleteRole: Middleware;
  getRoles: Middleware;
}
