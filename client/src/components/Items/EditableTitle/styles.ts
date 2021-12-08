import styled from 'styled-components';
import { Input } from 'antd';

export const InputChangeName = styled(Input)`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.midnight};
  margin-bottom: 5px;
  cursor: pointer;

  &:focus {
    background: white;
  }
`;
