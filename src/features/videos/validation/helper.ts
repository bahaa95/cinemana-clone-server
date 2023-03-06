import { isBoolean } from '@/utils/isBoolean';

export const preProcessDate = (arg: unknown) => {
  if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
};

export const preProcessBoolean = (arg: unknown) => {
  if (isBoolean(arg)) {
    return JSON.parse(arg as string);
  }
  return arg;
};
