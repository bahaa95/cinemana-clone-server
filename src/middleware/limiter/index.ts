import rateLimit, { Options, MemoryStore } from 'express-rate-limit';
import { statuses } from '@/lib/httperror';
import { Roles } from '@/static/roles';

// eslint-disable-next-line import/prefer-default-export
export function limiter(options: Partial<Options> = {}) {
  return rateLimit({
    windowMs: options.windowMs || 1000 * 60 * 15,
    max: options.max || 50,
    standardHeaders: true,
    legacyHeaders: true,
    /* tslint:disable-next-line */
    handler: (request, response, next, options) =>
      response.status(options.statusCode).json({
        status: statuses.Too_Many_Requests,
        name: 'TooManyRequests',
        message:
          options.message || 'Too many requests, please try again later.',
      }),
    skip: (request) => request.User?.roles?.includes(Roles.Admin) || false,
    ...options,
    store: new MemoryStore(),
  });
}
