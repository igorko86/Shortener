import styled from 'styled-components';
import { Input } from 'antd';
import Button from '../Button';

interface TitleProps {
  readonly isdisabled: number;
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
    outline: ${({ isdisabled }) => isdisabled ?? 'none'};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const EditButton = styled(Button)`
  position: absolute;
  right: 0;
`;
