import styled from 'styled-components';
import { Form as FormAnt } from 'antd';

import { theme } from '../../theme';

export const Form = styled(FormAnt)`
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
`;
