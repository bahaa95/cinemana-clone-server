import { NODE_ENV } from '@/config/index';

export function isDevelopment(): boolean {
  return NODE_ENV === 'development';
}
