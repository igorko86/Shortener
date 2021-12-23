import tokenService from './token.service';
import { Role, IServicesByRole, IGenerateTokensResult } from './interfaces';
import { IAuthLoginRequest, IAuthRegistrationRequest } from 'src/models/request/auth.request';

import userService from './user.service';
import tutorService from './tutor.service';
import ApiErrorService from './apiError.service';
import { Token } from '../db/entites/Token';

class AuthService {
  private services: IServicesByRole;

  constructor(services: IServicesByRole) {
    this.services = services;
  }

  async register(data: IAuthRegistrationRequest) {
    // @ts-ignore
    await this.services[data.role].register(data);
  }

  async activate(params: any) {
    const { link: id, role } = params;

    // @ts-ignore
    await this.services[role].activate(id);
  }

  async login(body: IAuthLoginRequest): Promise<IGenerateTokensResult> {
    // @ts-ignore
    return this.services[body.role].login(body);
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
    return await this.services[userData.role].refresh(userData.id);
  }
}

export default new AuthService({
  [Role.Viewer]: userService,
  [Role.Tutor]: tutorService,
});
