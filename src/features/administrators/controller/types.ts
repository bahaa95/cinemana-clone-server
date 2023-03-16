import { Middleware } from '@/types';
import { AdministratorDocument } from '../model';

export interface AdminstratorController {
  signup: Middleware;
  signin: Middleware;
  editAccount: Middleware;
  editRoles: Middleware;
  toggleActivated: Middleware;
  getAccounts: Middleware;
  refreshToken: Middleware;
  emailMustNotExistBefore: Middleware;
  isEmailExist: Middleware;
  comparePassword: Middleware;
  isAccountActivated: Middleware;
}

export type Payload = {
  account: AdministratorDocument;
};
