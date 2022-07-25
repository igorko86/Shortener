import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { theme } from '../../theme';

export const ContainerDiv = styled.div`
  height: 100vh;
  margin: 0 auto;
  padding: 75px 40px;
  background: ${theme.colors.light5};
`;

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderH2 = styled.h2`
  font-size: 100px;
  font-weight: 800;
  color: ${theme.colors.theme};
`;

export const NotFoundImg = styled.img`
  max-width: 350px;
`;

export const TitleH3 = styled.h3`
  font-size: 40px;
`;

export const HomeLink = styled(Link)`
  width: 150px;
  min-width: 80px;
  font-size: 16px;
  color: ${theme.colors.white};
  text-align: center;
  background: ${theme.colors.theme};
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;

  &:hover,
  a:hover {
    background: ${theme.colors.light1};
    color: ${theme.colors.white};
  }
`;
