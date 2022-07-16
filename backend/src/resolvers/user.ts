import { Resolvers } from '../generated/graphql-backend';

export const userResolver: Resolvers = {
  Query: {
    getAllUsers: () => {
      return [
        {
          id: 1,
          age: 3,
          username: 'Vasya',
        },
      ];
    },
    getUser: (parent, { id }) => {
      return {
        id,
        username: 'Vasya',
        age: 23,
      };
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      console.log('HERERER', args);
      return {
        id: 21,
        username: 'sdfsdfsdf',
        age: 23,
      };
    },
  },
};
