import { NextFunction, Request, Response } from 'express';

import tokenService from '../services/token.service';
import ApiErrorService from '../services/apiError.service';
import userService from '../services/user.service';

const checkUserAccess = async (id: string): Promise<boolean> => {
  return await userService.checkResourceAccess(id);
};

export const checkAccess = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !req.cookies.refreshToken) {
      throw ApiErrorService.unauthorized();
    }
    const [, accessToken] = authorizationHeader.split(' ');

    if (!accessToken) {
      throw ApiErrorService.unauthorized();
    }

    const userData = tokenService.validateToken(accessToken, process.env.JWT_ACCESS_SECRET as unknown as string);

    if (!userData) {
      throw ApiErrorService.unauthorized();
    }

    next();
  } catch (error) {
    next(error);
  }
};
