import { Button as ButtonAnt } from 'antd';

import styled from 'styled-components';

export interface IButtonStyle {
  $backgroundHover?: string;
}
export const ButtonStyle = styled(ButtonAnt)<IButtonStyle>`
  min-width: 80px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  background: 0;
  line-height: 1;
  border: 0;
  border-radius: 5px;

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover,
  &.ant-btn[disabled]:focus,
  &.ant-btn[disabled]:active {
    background: ${({ $backgroundHover, theme }) => $backgroundHover || theme.colors.light2};
    color: ${({ theme }) => theme.colors.white};

    border: none;
  }

  &:hover {
    background: ${({ $backgroundHover, theme }) => $backgroundHover || theme.colors.light1};
    color: ${({ theme }) => theme.colors.white};
  }

  &:active {
    background: ${({ $backgroundHover, theme }) => $backgroundHover || theme.colors.light2};
    color: ${({ theme }) => theme.colors.white};
  }
`;
