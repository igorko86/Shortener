import styled from 'styled-components';
import { Space } from 'antd';

import { theme } from '../../../theme';

export const NavPanelSpaceAnt = styled(Space)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.white};
  background: ${theme.colors.dark4};
`;
