import authService from '../../services/auth.service';

export const userResolvers = {
  Mutation: {
    signUp: async (parent: any, args: any) => {
      await authService.register(args.input);
    },
    signIn: (parent: any, args: any) => {
      return {
        id: 123,
        name: 'String',
        email: 'asd',
        type: 'String',
        token: 'String',
      };
    },
    activate: (parent: any, args: any) => {
      console.log('HERERER', args);
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
