/* eslint-disable import/prefer-default-export */
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { Application } from 'express';
import { SENTRY_DSN } from '@/config/index';

export function setupSentry(app: Application): void {
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],

    tracesSampleRate: 0.2,
  });
}
