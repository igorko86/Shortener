import bcrypt from 'bcrypt';
import moment from 'moment';

import mailService from './mail.service';
import tokenService from './token.service';
import { IGenerateTokensResult, Role } from './interfaces';
import apiErrorService from './apiError.service';
import ApiErrorService from './apiError.service';
import { ACTIVATE_ERROR, ACTIVATION_LINK_ERROR, PASSWORD_ERROR } from './constants';
import { IAuthLoginRequest, IUserRequest } from '../models/request/auth.request';
import { User } from '../db/entites/User';
import { userMailHtml } from './common/mailHtmls';

export default class UserAuthService {
  async register(data: IUserRequest): Promise<User> {
    const { name: userName, email: userEmail, password, role } = data;
    const user = await User.findOne({ email: userEmail });

    if (user) {
      throw apiErrorService.badRequest(`Sorry, User already exists with such email`);
    }

    const hashPassword = bcrypt.hashSync(String(password), 10);
    const newUser = User.create({
      email: userEmail,
      password: hashPassword,
      name: userName,
      role: role,
    });
    const savedUser = await newUser.save();
    const { id, email } = savedUser;

    const link = `${process.env.SERVER_URL}/api/auth/activation/${role}/${id}`;
    const html = userMailHtml({ link });

    await mailService.sendActivationMail(email, html);

    return savedUser;
  }

  async activate(id: string) {
    const user = await User.findOne(id);

    if (!user || user.isActive) {
      throw ApiErrorService.badRequest(ACTIVATION_LINK_ERROR);
    }
    user.isActive = true;
    user.allowTo = moment().utc() as unknown as Date;

    await user.save();
  }

  async login({ email, password, role }: IAuthLoginRequest): Promise<IGenerateTokensResult> {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiErrorService.badRequest(`Such "${email}" email doesn't exist`);
    } else if (!user.isActive) {
      throw ApiErrorService.badRequest(ACTIVATE_ERROR);
    }

    const isPassEquals = await bcrypt.compare(String(password), String(user.password));

    if (!isPassEquals) {
      throw ApiErrorService.badRequest(PASSWORD_ERROR);
    }

    return await tokenService.generateSaveTokens(user);
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(id: string): Promise<IGenerateTokensResult> {
    const user = await User.findOne(id);

    if (!user) {
      throw ApiErrorService.unauthorized();
    }

    return await tokenService.generateSaveTokens(user);
  }

  async checkResourceAccess(id: string): Promise<boolean> {
    const user = await User.findOne(id);

    return true;
  }
}
