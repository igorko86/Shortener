import React, { FC } from 'react';
import { Input } from 'antd';

import { InputSearch } from './styles';

const { Search: SearchAnt } = Input;

const onSearch = (value: string) => console.log(value);

const Search: FC = () => {
  return (
    <InputSearch>
      <SearchAnt placeholder="Search topic" onSearch={onSearch} enterButton />
    </InputSearch>
  );
};

export default Search;
