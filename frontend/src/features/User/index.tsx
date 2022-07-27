import { FC, useState } from 'react';

import Content from './Content';
import MyLibrary from './MyLibrary';
import PublicLibrary from './PublicLibrary';

import { ContentBlockDiv, GridBlock, LibraryBlockDiv, MyLibraryBlockDiv, UserDiv } from './styles';

const User: FC = () => {
  const [isLibraryOpened, setIsLibraryOpened] = useState(false);
  const [isMyLibraryOpened, setIsMyLibraryOpened] = useState(false);

  return (
    <UserDiv>
      <GridBlock isLibraryOpened={isLibraryOpened} isMyLibraryOpened={isMyLibraryOpened}>
        <MyLibraryBlockDiv>
          <MyLibrary />
        </MyLibraryBlockDiv>
        <LibraryBlockDiv>
          <PublicLibrary />
        </LibraryBlockDiv>
        <ContentBlockDiv>
          <Content />
        </ContentBlockDiv>
      </GridBlock>
    </UserDiv>
  );
};

export default User;
