import styled from 'styled-components';
import { Input } from 'antd';

interface TitleProps {
  readonly isdisabled: boolean;
}

export const InputChangeName = styled(Input)<TitleProps>`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.midnight};
  margin-bottom: 5px;
  cursor: pointer;

  &:focus {
    background: ${({ isdisabled }) => (isdisabled ? 'transparent' : 'white')};
  }
`;
