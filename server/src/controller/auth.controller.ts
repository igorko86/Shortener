import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import authService from '../services/auth.service';
import ApiErrorService from '../services/apiError.service';
import { VALIDATION_ERROR } from '../services/constants.service';
import { ITokenInfo } from '../services/types.services';

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiErrorService.badRequest(VALIDATION_ERROR, errors.array()));
      }
      await authService.registrationCompany(req.body);

      return res.json({
        message: `Company "${req.body.name}" has been registered successfully`,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const companyData = await authService.login(email, password);

      this.#setCookie({ token: companyData.refreshToken, id: companyData.refreshTokenId }, res);

      return res.status(200).json(companyData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.cookies.refreshToken.token);
      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'Logout is successful' });
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.link;

      await authService.activateCompany(id);
      res.redirect(process.env.CLIENT_URL as unknown as string);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const companyData = await authService.refresh(req.cookies.refreshToken);
      this.#setCookie({ token: companyData.refreshToken, id: companyData.refreshTokenId }, res);

      return res.status(200).json(companyData);
    } catch (error) {
      next(error);
    }
  }

  #setCookie(value: ITokenInfo, res: Response) {
    res.cookie('refreshToken', value, {
      maxAge: process.env.COOKIE_EXPIRES as unknown as number,
      httpOnly: true,
    });
  }
}

export default new AuthController();
