import bcryptPkg from 'bcrypt';
import { Bcrypt as IBcrypt } from './types';

class Bcrypt implements IBcrypt {
  private readonly bcrypt = bcryptPkg;
  private readonly salt: number = 10;

  /**
   * @param plainText — The plain text to be encrypted.
   * @return — A promise to be either resolved with the encrypted data
   */
  public hash = async (plainText: string): Promise<string> => {
    return await this.bcrypt.hash(plainText, this.salt);
  };

  /**
   * @param plainText — The plain text to be encrypted.
   * @param hash — The data to be compared against.
   * @return — A promise to be either resolved with true or rejected with false
   */
  public compare = async (
    plainText: string,
    hash: string,
  ): Promise<boolean> => {
    return await this.bcrypt.compare(plainText, hash);
  };
}

export const bcrypt = new Bcrypt();
