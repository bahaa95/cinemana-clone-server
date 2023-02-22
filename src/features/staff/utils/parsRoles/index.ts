import { ObjectId } from '@/types';

export function parseRoles(roles: string | string[]): ObjectId[] {
  const parsedRoles = (
    typeof roles === 'string' ? JSON.parse(roles) : roles
  ) as ObjectId[];

  return parsedRoles;
}
