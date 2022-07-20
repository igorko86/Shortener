import authService from '../../services/auth.service';
import { ISignUpRequest } from '../../models/request/auth.request';
import cookieService from '../../services/cookie.service';

export const authResolvers = {
  Query: {
    sayHello: () => 'Hello App!)',
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
  },
};
