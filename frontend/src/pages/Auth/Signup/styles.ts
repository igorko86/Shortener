import styled from 'styled-components';
import { Form } from 'antd';

export const ContainerDiv = styled.div`
  width: 900px;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 15px 16.83px 0.17px rgb(0 0 0 / 5%);
  border: 1px solid red;
`;

export const ContentDiv = styled.div`
  display: flex;
  padding: 75px 0;
`;

export const FormDiv = styled.div`
  margin-left: 75px;
  margin-right: 75px;
  padding-left: 34px;
`;

export const ImageDiv = styled.div`
  margin-top: 45px;
  margin: 0 55px;
  border: 1px solid red;
`;

// Form styles

export const TitleH2 = styled.h2`
  margin-bottom: 33px;
`;

export const RegisterForm = styled(Form)`
  width: 100%;

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
    content: none;
  }

  .ant-form-item-label > label::after {
    content: none;
  }

  .ant-form-item {
    border-bottom: 1px solid black;
  }

  .ant-form-item-explain-error {
    font-size: 8px;
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
  }
`;
