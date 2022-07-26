import { FC } from 'react';

import Content from './Content';
import MyLibrary from './MyLibrary';
import PublicLibrary from './PublicLibrary';

import { UserDiv } from './styles';

const User: FC = () => {
  return (
    <UserDiv>
      <Content />
      <MyLibrary />
      <PublicLibrary />
    </UserDiv>
  );
};

export default User;
