import { gql, useQuery } from '@apollo/client';

const ACTIVATE_QUERY = gql`
  query Activate($activateId: String!) {
    activate(id: $activateId) {
      status
      message
    }
  }
`;

export const useActivateQuery = (activateId: string) => {
  return useQuery(ACTIVATE_QUERY, {
    variables: {
      activateId,
    },
  });
};

const REFRESH_TOKEN_QUERY = gql`
  query Refresh {
    refresh {
      token
    }
  }
`;

export const useRefreshTokenQuery = () => {
  return useQuery<{ token: string }>(REFRESH_TOKEN_QUERY);
};
