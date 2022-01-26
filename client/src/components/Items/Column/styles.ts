import styled from 'styled-components';

import { List } from 'antd';

export const ColumnWrapper = styled.div`
  max-height: calc(100vh - 115px);
  display: flex;
  flex-direction: column;
  min-width: 250px;
  background: ${({ theme }) => theme.colors.brightGray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 8px;
  padding: 5px 10px 10px;
  height: fit-content;
  z-index: 5;

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    display: block;
  }

  .ant-list {
    max-height: calc(100vh - 115px);
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
