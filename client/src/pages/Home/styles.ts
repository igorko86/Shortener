import styled from 'styled-components';

export const DivWrapperLayout = styled.div`
  display: flex;
`;

export const DivPlan = styled.div`
  width: 250px;
`;

export const GridBlock = styled.div<{ isTutorOpen: boolean; isLibraryOpen: boolean }>`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: repeat(2, 150px);
  grid-template-areas:
    'a b c d'
    'e e ${({ isTutorOpen }) =>
      isTutorOpen ? 'c' : 'e'} ${({ isTutorOpen, isLibraryOpen }) => (isTutorOpen || isLibraryOpen ? 'd' : 'e')}';

  .cardContent {
    grid-area: e;
  }
`;
