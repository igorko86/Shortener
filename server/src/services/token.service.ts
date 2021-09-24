import jwt from 'jsonwebtoken';

import { Token } from '../db/entites/Token';
import { IGenerateTokensResult, ITokenInfo, ICompany } from './types.services';
import { Company } from '../db/entites/Company';

class TokenService {
  #generateTokens(payload: ICompany): IGenerateTokensResult {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async #saveToken(tokenInfo: ITokenInfo, company: Company) {
    if (tokenInfo.id) {
      const token = await Token.findOne({ companyId: company.id, id: tokenInfo.id });

      if (token) {
        token.refreshToken = tokenInfo.token;

        return await Token.save(token);
      }
    }
    const newToken = Token.create({
      refreshToken: tokenInfo.token,
      company,
    });

    return await newToken.save();
  }

  validateToken(token: string, secretKey: string): ICompany | null {
    try {
      return <ICompany>jwt.verify(token, secretKey);
    } catch {
      return null;
    }
  }

  async generateSaveTokens(
    company: Company,
    tokenInfo?: ITokenInfo
  ): Promise<IGenerateTokensResult & { refreshTokenId: string }> {
    const { id, email, name } = company;
    const tokens = this.#generateTokens({ id, email, name });
    const newTokenInfo = {
      token: tokenInfo ? tokenInfo.token : tokens.refreshToken,
      id: tokenInfo ? tokenInfo.id : '',
    };

    const savedRefreshToken = await this.#saveToken(newTokenInfo, company);

    return { ...tokens, refreshTokenId: savedRefreshToken.id };
  }

  async removeToken(refreshToken: string) {
    await Token.delete({ refreshToken });
  }
}

export default new TokenService();
