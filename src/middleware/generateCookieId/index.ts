import { v4 as uuidv4 } from 'uuid';
import { Middleware } from '@/types';
import { isProduction } from '@/utils/isProduction';

export const generateCookieId: Middleware = (req, res, next) => {
  let { cookies } = req;

  // generate cookie id
  if (!cookies?.id) {
    res.cookie('id', uuidv4(), {
      httpOnly: true,
      sameSite: 'lax',
      secure: isProduction(),
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
  }

  next();
};
