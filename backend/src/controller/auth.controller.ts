import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import authService from '../services/auth.service';
import ApiErrorService from '../services/apiError.service';
import { VALIDATION_ERROR } from '../services/constants';
import { Role } from '../services/interfaces';

class AuthController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiErrorService.badRequest(VALIDATION_ERROR, errors.array()));
      }
      await authService.register({ ...req.body, role: Role.Viewer });

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken, accessToken } = await authService.login(req.body);

      this.#setCookie(refreshToken, res);

      return res.status(200).json(accessToken);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.forgotPassword(req.body.email);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.resetPassword(req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.logout(req.cookies.refreshToken);
      res.clearCookie('refreshToken');

      return res.status(200).json({ message: 'Logout is successful' });
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.activate(req.params.link);

      res.redirect(process.env.CLIENT_URL as unknown as string);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken, accessToken } = await authService.refresh(req.cookies.refreshToken);

      this.#setCookie(refreshToken, res);

      return res.status(200).json(accessToken);
    } catch (error) {
      next(error);
    }
  }

  #setCookie(value: string, res: Response) {
    res.cookie('refreshToken', value, {
      maxAge: process.env.COOKIE_EXPIRES as unknown as number,
      httpOnly: true,
      // secure: true // TODO uncomment on prod
    });
  }
}

export default new AuthController();
