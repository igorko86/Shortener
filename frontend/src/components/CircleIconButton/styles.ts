import { Button as ButtonAnt } from 'antd';

import styled from 'styled-components';
import Button from '../Button';

export interface IButtonStyle {
  $backgroundHover?: string;
}

export const CircleButton = styled(ButtonAnt)<IButtonStyle>`
  &,
  &.ant-btn:hover,
  &.ant-btn:focus,
  &.ant-btn:active {
    min-width: 20px;
    padding: 0;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.theme};
    border: none;
    svg {
      height: 30px;
      width: 30px;
    }
  }

  &.ant-btn:after {
    content: none;
  }

  &.ant-btn[disabled],
  &.ant-btn[disabled]:hover,
  &.ant-btn[disabled]:focus,
  &.ant-btn[disabled]:active {
    background: ${({ theme }) => theme.colors.theme};
    color: ${({ theme }) => theme.colors.white};
    border: none;
    svg {
      fill: ${({ theme }) => theme.colors.grey};
    }
  }
`;
