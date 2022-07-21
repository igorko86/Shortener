import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';

import tokenService from './token.service';
import {IGenerateTokensResult, IUser, Role } from './interfaces';
import { IResetPasswordRequest, ISignInRequest, ISignUpRequest } from '../models/request/auth.request';
import ApiErrorService from './apiError.service';
import apiErrorService from './apiError.service';
import { Token } from '../db/entites/Token';
import { User } from '../db/entites/User';
import bcrypt from 'bcrypt';
import { ACTIVATION, RESET_PASSWORD } from './common/links';
import { forgotPasswordMailHtml, registerMailHtml } from './common/mailHtmls';
import mailService from './mail.service';
import { ACTIVATION_LINK_ERROR } from './constants';
import { EXIST_EMAIL, ACTIVATE_ERROR, LOGIN_ERROR } from '../shared/errorHandler';
import UserDto from '../dtos/user.dto';

class AuthService {
  async register(data: ISignUpRequest): Promise<void> {
    const { name: userName, email: userEmail, password, type } = data;
    const user = await User.findOne({ where: { email: userEmail, type } });

    if (user) {
      throw new Error(EXIST_EMAIL);
    }

    const hashPassword = bcrypt.hashSync(String(password), 10);
    const newUser = User.create({
      email: userEmail,
      password: hashPassword,
      name: userName,
      type,
    });
    const { id, email } = await newUser.save();
    const link = `${process.env.CLIENT_URL}/signup/activate?id=${id}`;
    const html = registerMailHtml({ link });

    await mailService.sendActivationMail(email, html);
  }

  async activate(id: string) {
    const user = await User.findOne(id);

    if (!user || user.isActive) {
      throw new Error(ACTIVATION_LINK_ERROR);
    }
    user.isActive = true;

    await user.save();
  }

  async login({ email, password }: ISignInRequest): Promise<IGenerateTokensResult> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(LOGIN_ERROR);
    } else if (!user.isActive) {
      throw new Error(ACTIVATE_ERROR);
    }

    const isPassEquals = await bcrypt.compare(String(password), String(user.password));

    if (!isPassEquals) {
      throw new Error(LOGIN_ERROR);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto } as unknown as IUser);

    await tokenService.saveRefreshToken(tokens.refreshToken);

    return tokens;
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(currentRefreshToken: string): Promise<IGenerateTokensResult> {
    if (!currentRefreshToken) {
      throw ApiErrorService.unauthorized();
    }

    const userData = tokenService.validateToken(
      currentRefreshToken,
      process.env.JWT_REFRESH_SECRET as unknown as string
    );
    const tokenFromDB = await Token.findOne({ refreshToken: currentRefreshToken });

    if (!userData || !tokenFromDB) {
      throw ApiErrorService.unauthorized();
    }

    const user = await User.findOne(userData.id);

    if (!user) {
      throw ApiErrorService.unauthorized();
    }

    return tokenService.generateSaveTokens(user);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await User.findOne({ email });

    if (!user) {
      throw apiErrorService.badRequest(`Sorry, but User with such email doesn't exist`);
    }
    const data = {
      id: user.id,
      expLink: moment().add(20, 'hours'),
    };

    const hash = jwt.sign(data, 'reset-password');
    const link = `${process.env.CLIENT_URL}/${RESET_PASSWORD}/${hash}`;
    const html = forgotPasswordMailHtml({ link });

    await mailService.sendActivationMail(email, html);
  }

  async resetPassword(data: IResetPasswordRequest): Promise<void> {
    const { id, password } = data;
    const user = await User.findOne(id);

    if (!user) {
      throw apiErrorService.badRequest(`Something went wrong!!!`);
    }
    const hashPassword = bcrypt.hashSync(String(password), 10);

    await User.update(user.id, { password: hashPassword });
  }

  async changeUserRole(role: Role, userId: string): Promise<IGenerateTokensResult> {
    const user = await User.findOne(userId);

    if (!user) {
      throw ApiErrorService.badRequest('User does not exist');
    }
    // await User.update(userId);

    const userData = await User.findOne(userId);

    if (!userData) {
      throw ApiErrorService.badRequest('User does not exist');
    }

    return tokenService.generateSaveTokens(userData);
  }
}

export default new AuthService();
