import jwt from 'jsonwebtoken';

import { Token } from '../db/entites/Token';
import { IGenerateTokensResult, ITutor } from './interfaces';
import { Tutor } from '../db/entites/Tutor';
import TutorDto from '../dtos/tutor.dto';

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

  async #saveRefreshToken(refreshToken: string, tutor: Tutor) {
    const tokenData = await Token.findOne({ tutorId: tutor.id });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return await Token.save(tokenData);
    }
    const newToken = Token.create({
      refreshToken: refreshToken,
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

  async generateSaveTokens(tutor: Tutor): Promise<IGenerateTokensResult> {
    const tutorDto = new TutorDto(tutor);
    const tokens = this.#generateTokens({ ...tutorDto } as unknown as ITutor);

    await this.#saveRefreshToken(tokens.refreshToken, tutor);

    return tokens;
  }

  async removeToken(refreshToken: string) {
    await Token.delete({ refreshToken });
  }
}

export default new TokenService();
