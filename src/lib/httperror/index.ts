import { createHttpError, statuses, Hydrate } from 'ts-httperror';

interface Schema {
  feature?: string;
  details?: string | object;
}

const HttpError = createHttpError<Schema>();

export { HttpError, statuses };
export type HttpErrorOpject = Hydrate<Schema>;
