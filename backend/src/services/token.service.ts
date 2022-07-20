import jwt from 'jsonwebtoken';

import { Token } from '../db/entites/Token';
import { IGenerateTokensResult, IUser } from './interfaces';
import { User } from '../db/entites/User';
import UserDto from '../dtos/user.dto';

class TokenService {
  generateTokens(payload: IUser): IGenerateTokensResult {
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

  async saveRefreshToken(refreshToken: string) {
    const tokenData = await Token.findOne({ refreshToken });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return Token.save(tokenData);
    }
    const newToken = Token.create({
      refreshToken,
    });

    return newToken.save();
  }

  validateToken(token: string, secretKey: string): IUser | null {
    try {
      return jwt.verify(token, secretKey) as IUser;
    } catch {
      return null;
    }
  }

  async generateSaveTokens(entity: User): Promise<IGenerateTokensResult> {
    const userDto = new UserDto(entity);
    const tokens = this.generateTokens({ ...userDto } as unknown as IUser);

    await this.saveRefreshToken(tokens.refreshToken);

    return tokens;
  }

  async removeToken(refreshToken: string) {
    await Token.delete({ refreshToken });
  }
}

export default new TokenService();
