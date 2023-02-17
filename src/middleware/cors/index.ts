import corsPackage from 'cors';
import { isDevelopment } from '@/utils/isDevelopment';
import { CLIENT_ORIGIN, DASHBORAD_ORIGIN } from '@/config/index';

// eslint-disable-next-line
export function cors() {
  return corsPackage({
    credentials: true,
    origin: isDevelopment() ? '*' : [CLIENT_ORIGIN, DASHBORAD_ORIGIN],
    optionsSuccessStatus: 200,
  });
}
