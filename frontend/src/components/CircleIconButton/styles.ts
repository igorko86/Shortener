import styled from 'styled-components';
import { Button as ButtonAnt } from 'antd';

import { theme } from '../../theme';

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
    color: ${theme.colors.white};
    background: transparent;
    height: 30px;
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
    background: transparent;
    color: ${theme.colors.white};
    border: none;
    svg {
      fill: ${theme.colors.grey};
    }
  }
`;
