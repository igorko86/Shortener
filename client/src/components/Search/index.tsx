// External
import { FC, useState } from 'react';
import { Input as InputAnt, Space } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, SearchOutlined } from '@ant-design/icons';
// Internal
import Button from 'components/Items/Button';
import Arrow from 'shared/assets/icons/arrow';
// Styles
import { InputSearch } from './styles';

interface IProps {
  setIsOpen?: any;
  isOpen?: boolean;
}

const Search: FC<IProps> = ({ setIsOpen, isOpen }) => {
  const [isSearch, setSearch] = useState(false);
  const maxMatch = 10;
  const [matchCount, setMatchCount] = useState(5);

  const onSearch = (e: any) => {
    setSearch(Boolean(e.target.value));
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

  const handleCLickOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <InputSearch isOpen={isOpen}>
        <InputAnt placeholder="Search" onChange={(e) => onSearch(e)} suffix={<SearchOutlined />} />
        {setIsOpen && <Button icon={<Arrow />} onClick={handleCLickOpen} />}
      </InputSearch>
      {isSearch && (
        <Space>
          <div>
            {matchCount}/{maxMatch}
          </div>
          <div>
            <Button icon={<ArrowUpOutlined />} onClick={previousMatch} isDisabled={matchCount === 1} />
            <Button icon={<ArrowDownOutlined />} onClick={nextMatch} isDisabled={matchCount >= maxMatch} />
          </div>
        </Space>
      )}
    </>
  );
};

export default Search;
