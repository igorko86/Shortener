import styled from 'styled-components';
import { Link as RoutLink } from 'react-router-dom';
import { Form } from 'antd';

import { theme } from '../../theme';
import { DEVICE } from '../../shared/constants';

export const AuthNavDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SinkInLink = styled(RoutLink)`
  color: ${theme.colors.white};
  &:hover {
    color: ${theme.colors.light4};
  }
`;

export const SinkUpLink = styled(SinkInLink)`
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
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
    content: none;
  }

  .ant-form-item-label > label::after {
    content: none;
  }

  .ant-form-item-with-help,
  .ant-form-item {
    max-width: 100%;
    border-bottom: 1px solid ${theme.colors.black};
    margin-bottom: 45px;
  }

  .ant-form-item-explain.ant-form-item-explain-connected {
    position: absolute;
    top: 38px;
  }

  .ant-form-item-explain-error {
    font-size: 12px;
  }

  .ant-input-affix-wrapper-status-error:not(.ant-input-affix-wrapper-disabled):not(.ant-input-affix-wrapper-borderless).ant-input-affix-wrapper,
  .ant-input-status-error:not(.ant-input-disabled):not(.ant-input-borderless).ant-input,
  .ant-input-affix-wrapper,
  .ant-input,
  .ant-input-affix-wrapper:focus,
  .ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover,
  .ant-input:focus-visible,
  .ant-input:hover,
  .ant-input:focus,
  .ant-input-focused {
    outline: none;
    border: none;
    box-shadow: none;
    border-right-width: 0;
    background: ${theme.colors.light5};
  }

  .ant-form-item-label > label > .anticon {
    font-size: 20px;
  }

  .ant-radio-wrapper,
  .ant-form-item-control-input-content input {
    font-size: 16px;
  }

  .ant-radio-group.ant-radio-group-outline {
    margin-left: 10px;
  }

  .ant-radio-inner {
    background: ${theme.colors.light5};
    border-color: ${theme.colors.light2};
  }

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
