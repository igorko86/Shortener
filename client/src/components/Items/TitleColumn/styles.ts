import styled from 'styled-components';
import { Input } from 'antd';

export const SpanTitleColumn = styled.span`
  color: ${({ theme }) => theme.colors.midnight};
  font-size: 20px;
  margin-bottom: 5px;
  cursor: default;
`;

export const TitleColumnPosition = styled.div<{ titlePosition?: string }>`
  width: 100%;
  text-align: ${({ titlePosition }) => titlePosition || 'center'};
`;

export const InputChangeName = styled(Input)`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.midnight};
  font-size: 20px;
  margin-bottom: 5px;
  cursor: pointer;

  &:focus {
    background: white;
  }
`;
