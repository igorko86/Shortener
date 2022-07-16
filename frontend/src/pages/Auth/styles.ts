import styled from 'styled-components';
import { Link as RoutLink } from 'react-router-dom';

export const AuthNavDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SinkInLink = styled(RoutLink)`
  color: ${({ theme }) => theme.colors.white};
  &:hover {
    color: ${({ theme }) => theme.colors.light4};
  }
`;

export const SinkUpLink = styled(SinkInLink)`
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  &:hover {
    color: ${({ theme }) => theme.colors.light4};
    border-color: ${({ theme }) => theme.colors.light4};
  }
`;
