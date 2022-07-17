import styled from 'styled-components';
import { Radio as RadioAnt } from 'antd';

import { theme } from '../../theme';

export const AppRadioButton = styled(RadioAnt)`
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: ${theme.colors.theme};
    box-shadow: 0 0 0 3px rgb(46 74 98 / 12%);
  }

  .ant-radio-checked::after,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-checked .ant-radio-inner {
    border: 1px solid ${theme.colors.theme};
  }

  .ant-radio-inner::after {
    background: ${theme.colors.theme};
  }
`;
