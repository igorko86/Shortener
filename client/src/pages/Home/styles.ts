import styled from 'styled-components';

export const DivWrapperLayout = styled.div`
  display: flex;
`;

export const DivPlan = styled.div`
  grid-area: plan;
`;

export const GridBlock = styled.div<{ isTutorOpen: boolean; isLibraryOpen: boolean }>`
  width: 100%;
  padding: 10px;
  display: grid;
  grid-template-rows: 150px auto;
  grid-template-columns: repeat(5, 19.5%);
  grid-template-areas:
    'plan group student myLib lib'
    'plan cont cont ${({ isTutorOpen }) =>
      isTutorOpen
        ? 'myLib'
        : 'cont'} ${({ isTutorOpen, isLibraryOpen }) => (isTutorOpen || isLibraryOpen ? 'lib' : 'cont')}';
  grid-column-gap: 10px;
`;
