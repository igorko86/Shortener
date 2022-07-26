import styled from 'styled-components';

import { Collapse, List } from 'antd';

export const ColumnWrapper = styled.div`
  max-height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  min-width: 250px;
  background: ${({ theme }) => theme.colors.light5};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 5px;
  padding: 5px 10px 10px;
  height: fit-content;
  z-index: 5;
  position: relative;

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    display: block;
  }

  .ant-list {
    max-height: calc(100vh - 250px);
  }
`;

export const ListWrapper = styled(List)`
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

export const CollapseOwn = styled(Collapse)`
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
