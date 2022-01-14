import tokenService from './token.service';
import { Role, IServicesByRole, IGenerateTokensResult } from './interfaces';
import {
  IAuthLoginRequest,
  IAuthRegistrationRequest,
  IForgotPasswordRequest,
  IResetPasswordRequest,
} from 'src/models/request/auth.request';

import UserAuthService from './userAuth.service';
import TutorAuthService from './tutorAuth.service';
import StudentAuthService from './studentAuth.service';
import ApiErrorService from './apiError.service';
import { Token } from '../db/entites/Token';

class AuthService {
  private services: IServicesByRole;

  constructor(services: IServicesByRole) {
    this.services = services;
  }

  async register(data: IAuthRegistrationRequest) {
    // @ts-ignore
    await this.services[data.role]?.register(data);
  }

  async activate(params: any) {
    const { link: id, role } = params;
    // @ts-ignore
    await this.services[role]?.activate(id);
  }

  async login(body: IAuthLoginRequest): Promise<IGenerateTokensResult> {
    // @ts-ignore
    return this.services[body.role]?.login(body);
  }

  async forgotPassword(body: IForgotPasswordRequest): Promise<IGenerateTokensResult> {
    // @ts-ignore
    return this.services[body.role]?.forgotPassword(body.email);
  }

  async resetPassword(body: IResetPasswordRequest): Promise<IGenerateTokensResult> {
    // @ts-ignore
    return this.services[body.role]?.resetPassword(body);
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

    // @ts-ignore
    return await this.services[userData.role]?.refresh(userData.id);
  }
}

export default new AuthService({
  [Role.Viewer]: new UserAuthService(),
  [Role.Tutor]: new TutorAuthService(),
  [Role.Student]: new StudentAuthService(),
});
