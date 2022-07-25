import { gql, useQuery } from '@apollo/client';

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
