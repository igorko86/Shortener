import styled from 'styled-components';
import { Space } from 'antd';

export const NavPanelSpaceAnt = styled(Space)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.dark4};
`;
