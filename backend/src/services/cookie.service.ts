import { Response } from 'express';

class CookieService {
  private readonly cookieOptions: { maxAge: number; httpOnly: boolean; secure: boolean, sameSite: any };

  constructor() {
    this.cookieOptions = {
      maxAge: process.env.COOKIE_EXPIRES as unknown as number,
      httpOnly: true,
      sameSite: 'none',
      secure: true
    };
  }

  setCookie(response: Response, value: string) {
    response.cookie('refreshToken', value, this.cookieOptions);
  }

  clearCookies(response: Response) {
    response.clearCookie('refreshToken');
  }
}

export default new CookieService();
