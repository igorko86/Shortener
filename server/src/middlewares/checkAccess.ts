import { NextFunction, Request, Response } from 'express';

import tokenService from '../services/token.service';
import ApiErrorService from '../services/apiError.service';

export const checkAccess = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !req.cookies.refreshToken) {
      throw ApiErrorService.unauthorized();
    }
    const [, accessToken] = authorizationHeader.split(' ');

    if (!accessToken) {
      throw ApiErrorService.unauthorized();
    }

    const tutorData = tokenService.validateToken(accessToken, process.env.JWT_ACCESS_SECRET as unknown as string);

    if (!tutorData) {
      throw ApiErrorService.unauthorized();
    }

    next();
  } catch (error) {
    next(error);
  }
};
