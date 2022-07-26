import styled from 'styled-components';
import { Avatar as AvatarAnt } from 'antd';

import { theme } from '../../../../theme';

export const AppAvatar = styled(AvatarAnt)`
  font-size: 20px;
  color: ${theme.colors.black};
  vertical-align: middle;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.white};
  cursor: pointer;
`;
