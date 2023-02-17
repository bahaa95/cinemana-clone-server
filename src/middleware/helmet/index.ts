import helmetPkg, { HelmetOptions } from 'helmet';

// eslint-disable-next-line
export function helmet(options?: Readonly<HelmetOptions> | undefined) {
  return helmetPkg(options);
}
