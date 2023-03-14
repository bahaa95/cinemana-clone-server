import { UserModel, UserDocument } from '../model';
import { UserService as IUserService } from './types';

// ! don't return the value for methods with access private to clients or admins it's for internal usage only.
// ! only return the value for public methods.

export class UserService implements IUserService {
  private readonly User: UserModel;

  constructor(_UserModel: UserModel) {
    this.User = _UserModel;
  }

  /**
   * @access private
   */
  public addUser: IUserService['addUser'] = async (user) => {
    let newUser = await new this.User(user).save();
    return newUser;
  };

  /**
   * @access private
   */
  public getUser: IUserService['getUser'] = async (query) => {
    let [user] = await this.User.aggregate<UserDocument>([
      { $match: { ...query } },
    ]);

    if (!user) return null;

    return user;
  };
}
