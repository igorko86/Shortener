import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Input as InputAnt } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Button, Div } from './styles';
import useDebounce from '../../../../shared/hooks/useDebaunce';

interface IProps {
  title: string;
  placeholder?: string;
  setCollapsedPanel: (collapsedPanel: string) => void;
  searchDataByValue?: (value: string) => void;
}

const ColumnHeader: FC<IProps> = ({ title, setCollapsedPanel, placeholder = 'Search', searchDataByValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFirst, setIsFirst] = useState(true);

  const debouncedValue = useDebounce(inputValue.trim(), 300);

  const handleCLick = () => {
    setCollapsedPanel(!isOpen ? 'collapse' : '');
    setIsOpen(!isOpen);
  };

  const handleChange = (e: ChangeEvent) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  useEffect(() => {
    if (searchDataByValue && !isFirst) {
      searchDataByValue(debouncedValue);
    }
    setIsFirst(false);
  }, [debouncedValue]);

  return (
    <>
      <span>{title}</span>
      <Div>
        <InputAnt
          allowClear
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          suffix={!inputValue && <SearchOutlined />}
        />
      </Div>
    </>
  );
};

export default ColumnHeader;
