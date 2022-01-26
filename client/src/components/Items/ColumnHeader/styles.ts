import styled from 'styled-components';

import { Button as ButtonAnt } from 'antd';

export const Button = styled(ButtonAnt)<{
  $isOpen?: boolean;
}>`
  margin-left: 5px;
  box-shadow: none;

  svg {
    margin-right: 0;
    height: 13px;
    transform: ${({ $isOpen }) => `rotate(${$isOpen ? '0' : '180deg'})`};

    path {
      fill: ${({ theme }) => theme.colors.midnight};
    }
  }
`;

export const Div = styled.div`
  width: 100%;
  height: 32px;
  backdrop-filter: blur(4px);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: 15px;
  background: none;
  display: flex;

  [aria-label='search'] {
    svg {
      path {
        fill: ${({ theme }) => theme.colors.silver};
      }
    }
  }
`;
