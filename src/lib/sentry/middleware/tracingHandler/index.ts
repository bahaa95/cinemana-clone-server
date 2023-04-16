import * as Sentry from '@sentry/node';

// eslint-disable-next-line import/prefer-default-export
export function tracingHandler() {
  return Sentry.Handlers.tracingHandler();
}
