import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { AUTH_TOKEN_KEY } from '../constants';
import { errorHandler } from './errorHandler';

export const QRAPHQL_SERVER_URI = `${process.env.REACT_APP_SERVER_URL}/graphql`;

const errorLink = onError(errorHandler);

const httpLink = createHttpLink({
  uri: QRAPHQL_SERVER_URI,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});
