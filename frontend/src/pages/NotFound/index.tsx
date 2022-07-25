import { FC } from 'react';

import PageNotFoundImg from '../../assets/img/notFound.svg';
import { AppPagePath } from '../AppPagePath';

import { ContainerDiv, ContentDiv, HeaderH2, HomeLink, NotFoundImg, TitleH3 } from './styles';

const NotFound: FC = () => {
  return (
    <ContainerDiv>
      <ContentDiv>
        <HeaderH2>404</HeaderH2>
        <NotFoundImg src={PageNotFoundImg} alt="page not found" />
        <TitleH3>Oops, Page Not Found (:</TitleH3>
        <HomeLink to={`${AppPagePath.HOME}`}>HOME</HomeLink>
      </ContentDiv>
    </ContainerDiv>
  );
};

export default NotFound;
