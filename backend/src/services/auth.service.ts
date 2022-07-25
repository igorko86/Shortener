import moment from 'moment-timezone';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import tokenService from './token.service';
import { IGenerateTokensResult, IUser, Role } from './interfaces';
import { IResetPasswordRequest, ISignInRequest, ISignUpRequest } from '../models/request/auth.request';
import { User } from '../db/entites/User';
import { RESET_PASSWORD } from './common/links';
import { forgotPasswordMailHtml, registerMailHtml } from './common/mailHtmls';
import mailService from './mail.service';
import {
  EXIST_EMAIL,
  ACTIVATE_ERROR,
  LOGIN_ERROR,
  EMAIL_NOT_EXIST,
  ACTIVATION_LINK_ERROR,
  UNAUTHORIZED,
  SOMETHING_WENT_WRONG
} from '../shared/errorHandler';
import UserDto from '../dtos/user.dto';

class AuthService {
  async register(data: ISignUpRequest): Promise<void> {
    const { name: userName, email: userEmail, password, type } = data;
    const user = await User.findOne({ email: userEmail });

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
    const hash = jwt.sign({ id }, 'user-id');

    const link = `${process.env.CLIENT_URL}/signup/activate/${hash}`;
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
      throw new Error(UNAUTHORIZED);
    }

    const userData = tokenService.validateToken(
      currentRefreshToken,
      process.env.JWT_REFRESH_SECRET as unknown as string
    );

    if (!userData) {
      throw new Error(UNAUTHORIZED);
    }

    const user = await User.findOne(userData.id);

    if (!user) {
      throw new Error(UNAUTHORIZED);
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto } as unknown as IUser);

    await tokenService.saveRefreshToken(tokens.refreshToken, currentRefreshToken);

    return tokens;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error(EMAIL_NOT_EXIST);
    }

    const data = {
      id: user.id,
      expLink: moment().add(10, 'minutes'),
    };

    const hash = jwt.sign(data, 'reset-password');
    const link = `${process.env.CLIENT_URL}/reset-password/${hash}`;
    const html = forgotPasswordMailHtml({ link });

    await mailService.sendActivationMail(email, html);
  }

  async resetPassword({ id, password }: IResetPasswordRequest): Promise<void> {
    const user = await User.findOne(id);

    if (!user) {
      throw new Error(SOMETHING_WENT_WRONG);
    }
    const hashPassword = bcrypt.hashSync(String(password), 10);

    await User.update(user.id, { password: hashPassword });
  }
}

export default new AuthService();
