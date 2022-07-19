import authService from '../../services/auth.service';
import { ISignUpRequest } from '../../models/request/auth.request';

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
      console.log(args);
      await authService.register(args.input);

      return {
        status: 200,
        message: 'Success',
      };
    },
    signIn: (_: any, args: any) => {
      console.log(args);
      return {
        id: 123,
        name: 'String',
        email: 'asd',
        type: 'String',
        token: 'String',
      };
    },
  },
};
