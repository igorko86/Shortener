import { Response } from 'express';

class CookieService {
  private readonly cookieOptions: { maxAge: number; httpOnly: boolean; secure: boolean };

  constructor() {
    this.cookieOptions = {
      maxAge: process.env.COOKIE_EXPIRES as unknown as number,
      httpOnly: true,
      // secure: true // TODO uncomment on prod
      secure: false, // TODO remove on prod
    };
  }

  setCookie(response: Response, value: string) {
    response.cookie('refreshToken', value, this.cookieOptions);
  }
}

export default new CookieService();
