import { Resolvers } from '../../generated/graphql-backend';

export const uResolver: Resolvers = {
  Query: {
    getAllU: () => {
      return [
        {
          id: 1,
          ageA: 3,
          username: 'Vasya',
          usernameS: 'Vasya',
        },
      ];
    },
  },
};
