import jwt from 'jsonwebtoken';

import { Token } from '../db/entites/Token';
import { IGenerateTokensResult, ITokenInfo, ITutor } from './types.services';
import { Tutor } from '../db/entites/Tutor';

class TokenService {
  #generateTokens(payload: ITutor): IGenerateTokensResult {
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

  async #saveToken(tokenInfo: ITokenInfo, tutor: Tutor) {
    if (tokenInfo.id) {
      const token = await Token.findOne({ tutorId: tutor.id, id: tokenInfo.id });

      if (token) {
        token.refreshToken = tokenInfo.token;

        return await Token.save(token);
      }
    }
    const newToken = Token.create({
      refreshToken: tokenInfo.token,
      tutor,
    });

    return await newToken.save();
  }

  validateToken(token: string, secretKey: string): ITutor | null {
    try {
      return <ITutor>jwt.verify(token, secretKey);
    } catch {
      return null;
    }
  }

  async generateSaveTokens(
    tutor: Tutor,
    tokenInfo?: ITokenInfo
  ): Promise<IGenerateTokensResult & { refreshTokenId: string }> {
    const { id, email, name } = tutor;
    const tokens = this.#generateTokens({ id, email, name });
    const newTokenInfo = {
      token: tokenInfo ? tokenInfo.token : tokens.refreshToken,
      id: tokenInfo ? tokenInfo.id : '',
    };

    const savedRefreshToken = await this.#saveToken(newTokenInfo, tutor);

    return { ...tokens, refreshTokenId: savedRefreshToken.id };
  }

  async removeToken(refreshToken: string) {
    await Token.delete({ refreshToken });
  }
}

export default new TokenService();
