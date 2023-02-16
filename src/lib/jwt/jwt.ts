import jsonwebtoken, { Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';
import { JsonWebToken as IJsonWebToken, Payload } from './types';

class JsonWebToken implements IJsonWebToken {
  private readonly jwt = jsonwebtoken;

  public sign: IJsonWebToken['sign'] = async (
    payload,
    secretOrPrivateKey,
    options,
  ) => {
    return await this.jwt.sign(payload, secretOrPrivateKey, options);
  };

  public verify: IJsonWebToken['verify'] = async <T extends Payload>(
    token: string,
    secretOrPublicKey: Secret | GetPublicKeyOrSecret,
  ) => {
    return new Promise<T>((resolve, reject) => {
      this.jwt.verify(token, secretOrPublicKey, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded as T);
      });
    });
  };
}

export const jwt = new JsonWebToken();
