import authService from '../../services/auth.service';
import { ISignUpRequest } from '../../models/request/auth.request';
import cookieService from '../../services/cookie.service';
import { checkAccess } from '../../shared/checkAccess';

export const authResolvers = {
  Query: {
    sayHello: async (_: any, args: any, { req }: any) => {
      const userData = await checkAccess(req);
      console.log(userData);
    },
    activate: async (_: any, args: { id: string }) => {
      await authService.activate(args.id);

      return {
        status: 200,
        message: 'Success',
      };
    },
  },
  Mutation: {
    signUp: async (_: any, args: { input: ISignUpRequest }) => {
      await authService.register(args.input);

      return {
        status: 200,
        message: 'Success',
      };
    },
    signIn: async (_: any, args: any, { res }: any) => {
      const { refreshToken, accessToken } = await authService.login(args.input);

      cookieService.setCookie(res, refreshToken);

      return {
        token: accessToken,
      };
    },
    signOut: async (_: any, args: any, { req, res }: any) => {
      await authService.logout(req.cookies.refreshToken);

      cookieService.clearCookies(res);

      return {
        status: 200,
        message: 'Success',
      };
    },
  },
};
