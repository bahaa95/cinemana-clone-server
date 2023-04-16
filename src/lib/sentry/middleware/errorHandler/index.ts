import * as Sentry from '@sentry/node';

// eslint-disable-next-line import/prefer-default-export
export function errorHandler() {
  return Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture unknown error and error with status 400 and above
      if (!error.status || Number(error.status) >= 400) {
        return true;
      }
      return false;
    },
  });
}
