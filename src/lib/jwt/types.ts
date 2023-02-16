import { SignOptions, Secret, GetPublicKeyOrSecret } from 'jsonwebtoken';

export type Payload = string | object | Buffer;

export interface JsonWebToken {
  sign<T extends Payload>(
    payload: T,
    secretOrPrivateKey: Secret,
    options: SignOptions,
  ): Promise<string>;

  verify<T extends Payload>(
    token: string,
    secretOrPublicKey: Secret | GetPublicKeyOrSecret,
  ): Promise<T>;
}
