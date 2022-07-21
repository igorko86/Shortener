import { NextFunction, Request, Response } from 'express';

import tokenService from '../services/token.service';
import { UNAUTHORIZED } from '../shared/errorHandler';
import { UserType } from '../services/interfaces';

interface IUserData {
  type: UserType;
  email: string;
  id: string;
  name: string;
}

export const checkAccess = async (req: Request): Promise<IUserData> => {
  const barerToken = req.headers.authorization;
  console.log('HERERERER', req.headers);

  if (!barerToken || !req.cookies.refreshToken) {
    throw new Error(UNAUTHORIZED);
  }
  const [, accessToken] = barerToken.split(' ');

  if (!accessToken) {
    throw new Error(UNAUTHORIZED);
  }

  const userData = tokenService.validateToken(accessToken, process.env.JWT_ACCESS_SECRET as unknown as string);

  if (!userData) {
    throw new Error(UNAUTHORIZED);
  }

  return userData;
};
