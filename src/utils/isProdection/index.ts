import { NODE_ENV } from '@/config/index';

export function isProduction(): boolean {
  return NODE_ENV !== 'development';
}