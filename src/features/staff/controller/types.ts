import { Middleware } from '@/types';

export interface StaffController {
  addPerson: Middleware;
  editPerson: Middleware;
  deletePerson: Middleware;
  getStaff: Middleware;
  getStaffByRole: Middleware;
  getPersonAndVideos: Middleware;
  getPerson: Middleware;
}
