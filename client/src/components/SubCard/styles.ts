import Card from 'components/Items/Card/intex';
import styled from 'styled-components';

export const DivSubCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.lightGray1};
  margin-bottom: 0.5rem;
  box-shadow: none;
`;
