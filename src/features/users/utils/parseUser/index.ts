import { SignupSchema } from '../../vlaidation';
import { IUser } from '../../model';

export function parseUser(user: Partial<SignupSchema['body']>): IUser {
  const { email, password, username } = user;

  return { email, password, username } as IUser;
}
