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
  gap: 20px;
  padding: 75px 40px;
`;

export const RegBlkDiv = styled.div`
  width: 50%;
`;

export const ImgBlkDiv = styled(RegBlkDiv)`
  display: flex;
`;

// Register Form styles

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 33px;
  h2 {
    font-size: 30px;
  }
  span {
    display: inline-block;
  }
`;

export const RegisterForm = styled(Form)`
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional):before {
    content: none;
  }

  .ant-form-item-label > label::after {
    content: none;
  }

  .ant-form-item-with-help,
  .ant-form-item {
    max-width: 100%;
    border-bottom: 1px solid black;
    margin-bottom: 45px;
  }

  .ant-form-item:last-of-type {
    border-bottom: 0;
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

  .ant-radio-wrapper,
  .ant-form-item-control-input-content input {
    font-size: 16px;
  }

  .ant-radio-group.ant-radio-group-outline {
    margin-left: 10px;
  }

  button {
    min-width: 120px;
    min-height: 42px;
  }
`;

// Image styles

export const FormImage = styled.img`
  width: 100%;
  margin: auto;
`;
