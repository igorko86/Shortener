import authService from '../../services/auth.service';

export const authResolvers = {
  Query: {
    verify: (parent: any, args: any, ctx: any) => {
      console.log(args);
      // Your verification logic
      ctx.res.redirect('https://www.google.com');
    },
  },
  Mutation: {
    signUp: async (parent: any, args: any) => {
      console.log(args);
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
    verify: (parent: any, args: any, ctx: any) => {
      console.log(args);
      // Your verification logic
      ctx.res.redirect('https://www.google.com');
    },
  },
};
