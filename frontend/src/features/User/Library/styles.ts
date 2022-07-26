import styled from 'styled-components';
import { Collapse, List } from 'antd';

import { theme } from '../../../theme';

export const LibrarySection = styled.section`
  min-width: 250px;
  background: ${theme.colors.light5};
  box-shadow: ${theme.boxShadow};
`;

export const LibraryCollapse = styled(Collapse)`
  background: none;
  border: none;

  & > .ant-collapse-item {
    border: none;

    & > .ant-collapse-header {
      padding: 0;
    }

    &.ant-collapse-no-arrow > .ant-collapse-header {
      padding: 0;
    }
  }
`;

export const Panel = styled(Collapse.Panel)`
  .ant-collapse-content {
    background: none;
    border: none;

    .ant-collapse-content-box {
      padding: 0;
    }
  }
`;

export const ContentList = styled(List)`
  overflow: auto;

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.iron};
  }

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    background-color: transparent;
  }
`;
