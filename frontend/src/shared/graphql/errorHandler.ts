import { ErrorResponse } from '@apollo/client/link/error';

import { Status } from '../interfaces';
import { notificationWithIcon } from '../notification';
import { Observable } from '@apollo/client';
import { AUTH_TOKEN_KEY } from '../constants';
import { QRAPHQL_SERVER_URI } from './apolloClient';
import { AppPagePath } from '../../pages/AppPagePath';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const signOut = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);

  fetch(QRAPHQL_SERVER_URI, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: 'mutation { signOut { status message } }',
    }),
    credentials: 'include',
  });

  window.location.href = `${process.env.REACT_APP_CLIENT_URL}/${AppPagePath.SIGNIN}`;
};

const getToken = async () => {
  const response = await fetch(QRAPHQL_SERVER_URI, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: 'mutation { refresh }',
    }),
    credentials: 'include',
  });
  const { data, errors } = await response.json();

  if (!data || errors) {
    signOut();
    throw Error(errors);
  }

  return data.refresh;
};

export const errorHandler = ({ graphQLErrors, operation, forward }: ErrorResponse) => {
  if (graphQLErrors) {
    const er = graphQLErrors as any;

    for (const err of er) {
      switch (err.status) {
        case Status.BadRequest:
          return notificationWithIcon('error', err.message);
        case Status.Unauthorized: {
          return new Observable((observer) => {
            (async () => {
              try {
                const token = await getToken();
                const oldHeaders = operation.getContext().headers;

                localStorage.setItem(AUTH_TOKEN_KEY, token);

                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${token}`,
                  },
                });

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };

                // Retry last failed request
                forward(operation).subscribe(subscriber);
              } catch (error) {
                observer.error(error);
              }
            })();
          }) as any;
        }
      }
    }
  }
};
