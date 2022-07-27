import styled from 'styled-components';

export const UserDiv = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContentBlockDiv = styled.div`
  grid-area: cont;
`;

export const LibraryBlockDiv = styled.div`
  grid-area: lib;
`;

export const MyLibraryBlockDiv = styled.div`
  grid-area: myLib;
`;

export const GridBlock = styled.div<{
  isLibraryOpened: boolean;
  isMyLibraryOpened: boolean;
}>`
  width: 100%;
  display: grid;
  grid-gap: 8px;
  grid-template-rows: 100px auto;
  grid-template-columns: repeat(5, 19.5%);
  grid-template-areas:
    '. . . myLib lib'
    'cont cont cont ${({ isMyLibraryOpened }) => (isMyLibraryOpened ? 'myLib' : 'cont')} lib';
`;
