import corsPackage from 'cors';
import { CLIENT_ORIGIN, DASHBORAD_ORIGIN } from '@/config/index';

// eslint-disable-next-line
export function cors() {
  return corsPackage({
    credentials: true,
    origin: [CLIENT_ORIGIN, DASHBORAD_ORIGIN],
    optionsSuccessStatus: 200,
  });
}
