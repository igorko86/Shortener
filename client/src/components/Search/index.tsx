import React, { FC, useState } from 'react';
import { Input, Space } from 'antd';

import Button from 'components/Items/Button';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { InputSearch } from './styles';

const { Search: SearchAnt } = Input;

const Search: FC = () => {
  const [isSearch, setSearch] = useState(false);
  const maxMatch = 10;
  const [matchCount, setMatchCount] = useState(5);

  const onSearch = (value: string) => {
    setSearch(Boolean(value));
  };

  const previousMatch = () => {
    let count = matchCount;
    count--;
    setMatchCount(count);
  };

  const nextMatch = () => {
    let count = matchCount;
    count++;
    setMatchCount(count);
  };

  return (
    <div>
      <InputSearch>
        <SearchAnt placeholder="Search topic" onSearch={onSearch} enterButton />
      </InputSearch>
      {isSearch ? (
        <Space>
          <div>
            {matchCount}/{maxMatch}
          </div>
          <div>
            <Button icon={<ArrowUpOutlined />} onClick={previousMatch} isDisabled={matchCount === 1} />
            <Button icon={<ArrowDownOutlined />} onClick={nextMatch} isDisabled={matchCount >= maxMatch} />
          </div>
        </Space>
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
