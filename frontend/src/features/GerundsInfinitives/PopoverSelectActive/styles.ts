import styled from 'styled-components';

export const FilterDiv = styled.div`
  cursor: pointer;
`;

export const IconSpan = styled.span`
  svg {
    fill: ${({ theme }) => theme.colors.green};
  }
`;
