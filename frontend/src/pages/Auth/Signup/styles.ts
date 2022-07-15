import styled from 'styled-components';
import { Form } from 'antd';

export const ContainerDiv = styled.div`
  max-width: 900px;
  background: #fff;
  margin: 0 auto;
  box-shadow: 0px 15px 16.83px 0.17px rgb(0 0 0 / 5%);
  background: ${({ theme }) => theme.colors.light5};
`;

export const ContentDiv = styled.div`
  display: flex;
  padding: 75px 40px;
`;

export const FormDiv = styled.div`
  width: 60%;
  margin-right: 20px;
`;

export const ImageDiv = styled.div`
  width: 50%;
  border: 1px solid red;
`;

// Form styles

export const TitleH2 = styled.h2`
  margin-bottom: 33px;
`;

export const RegisterForm = styled(Form)`
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
    content: none;
  }

  .ant-form-item-label > label::after {
    content: none;
  }

  .ant-form-item {
    max-width: 100%;
    border-bottom: 1px solid black;
    margin-bottom: 30px;
  }

  .ant-form-item-with-help {
    margin-bottom: 30px;
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
    background: ${({ theme }) => theme.colors.light5};
  }

  .ant-form-item-label > label > .anticon {
    font-size: 20px;
  }

  button {
    margin-top: 20px;
  }
`;
