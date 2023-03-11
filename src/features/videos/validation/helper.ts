import { isArray } from '@/utils/isArray';
import { isBoolean } from '@/utils/isBoolean';
import { jsonParse } from '@/utils/jsonParse';

export const preProcessDate = (arg: unknown) => {
  if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
};

export const preProcessBoolean = (arg: unknown) => {
  if (isBoolean(arg)) {
    return JSON.parse(arg as string);
  }
  return arg;
};

export const preProcessArray = (value: unknown) => {
  return isArray(value) ? jsonParse(value) : value;
};
