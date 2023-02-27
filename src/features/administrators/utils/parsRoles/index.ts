import { AdministratorRoles } from '../../roles';

export function parseRoles(roles: string | string[]): AdministratorRoles[] {
  const parsedRoles = (
    typeof roles === 'string' ? JSON.parse(roles) : roles
  ) as AdministratorRoles[];

  return parsedRoles;
}
