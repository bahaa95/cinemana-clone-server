import rateLimit, { Options, MemoryStore } from 'express-rate-limit';
import { statuses } from '@/lib/httperror';

export function limiter(options: Partial<Options> = {}) {
  return rateLimit({
    windowMs: options.windowMs || 1000 * 60 * 15,
    max: options.max || 50,
    standardHeaders: true,
    legacyHeaders: true,
    keyGenerator: (req, res) => req.cookies?.id,
    /* tslint:disable-next-line */
    handler: (request, response, next, options) =>
      response.status(options.statusCode).json({
        status: statuses.Too_Many_Requests,
        name: 'TooManyRequests',
        message:
          options.message || `Too many requests, please try again later.`,
      }),
    ...options,
    store: new MemoryStore(),
  });
}
