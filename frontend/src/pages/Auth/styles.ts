import styled from 'styled-components';
import { Link as RoutLink } from 'react-router-dom';

import { theme } from '../../theme';
import { DEVICE } from '../../shared/constants';
import { Form } from '../../shared/styles/formStyles';

export const AuthNavDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SinInLink = styled(RoutLink)`
  color: ${theme.colors.white};
  &:hover {
    color: ${theme.colors.light4};
  }
`;

export const SinUpLink = styled(SinInLink)`
  padding: 5px 8px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.white};
  &:hover {
    color: ${theme.colors.light4};
    border-color: ${theme.colors.light4};
  }
`;

export const ContainerDiv = styled.div`
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0px 15px 16.83px 0.17px rgb(0 0 0 / 5%);
  background: ${theme.colors.light5};

  @media ${DEVICE.laptop} {
    width: calc(100% - 30px);
  } ;
`;

export const ContentDiv = styled.div`
  display: flex;
  gap: 20px;
  padding: 75px 40px;

  @media ${DEVICE.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

export const RegBlkDiv = styled.div`
  width: 50%;

  @media ${DEVICE.tablet} {
    width: 70%;
  }
  @media (max-width: 575px) {
    width: 85%;
  }
  @media ${DEVICE.mobileL} {
    width: 100%;
  }
`;

export const TitleH2 = styled.h2`
  font-size: 30px;
  margin-bottom: 33px;
`;

export const AuthForm = styled(Form)`
  @media ${DEVICE.tablet} {
    &.ant-form .ant-form-item .ant-form-item-label,
    &.ant-form .ant-form-item .ant-form-item-control {
      flex: none;
    }

    & .ant-col.ant-form-item-control {
      width: calc(100% - 20px);
    }
  }

  button {
    min-width: 120px;
    min-height: 42px;
  }
`;

// Image styles

export const ImgBlkDiv = styled(RegBlkDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    margin: 10px 0;
  }
`;

export const AuthImage = styled.img`
  width: 100%;
  @media ${DEVICE.tablet} {
    display: none;
  }
`;
