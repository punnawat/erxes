import * as express from 'express';
import { IUser } from '../../../models/definitions';
import { ILoginParams } from '../../types';
import Users from '../../../models/Users';
import { IContext } from '../../types';
import { authCookieOptions } from '../utils';

type AddParams = {
  configId: string;
} & IUser;

const login = async (
  args: ILoginParams,
  res: express.Response,
  secure: boolean
) => {
  const response = await Users.login(args);

  const { token } = response;

  res.cookie('client-auth-token', token, authCookieOptions(secure));

  return 'loggedIn';
};

const userMutations = {
  async userAdd(_root, args: IUser) {
    return Users.createUser(args);
  },

  /*
   * Login
   */
  async login(_root, args: ILoginParams, { res, requestInfo }: IContext) {
    return login(args, res, requestInfo.secure);
  },

  /*
   * Logout
   */
  async logout(_root, _args, { res }: IContext) {
    res.cookie('client-auth-token', '1', { maxAge: 0 });

    return 'loggedout';
  },

  /*
   * Change user password
   */
  userChangePassword(
    _root,
    args: { currentPassword: string; newPassword: string },
    { user }: IContext
  ) {
    return Users.changePassword({ _id: user._id, ...args });
  },

  /*
   * Change user password
   */
  resetPasswordWithCode(
    _root,
    args: { phone: string; password: string; code: string }
  ) {
    return Users.changePasswordWithCode(args);
  },

  async forgotPassword(_root, { email }: { email: string }) {
    return Users.forgotPassword(email);
  },
  /*
   * Edit user profile
   */
  async userEdit(_root, args: IUser, { user }: IContext) {
    return Users.editProfile(user._id, args);
  }
};

export default userMutations;
