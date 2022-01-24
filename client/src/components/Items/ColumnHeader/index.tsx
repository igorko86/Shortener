// External
import { ChangeEvent, FC, useState } from 'react';
import { Input as InputAnt } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// Internal
import TitleColumn from '../TitleColumn';
import Arrow from 'shared/assets/icons/arrow';
// Styles
import { Button, Div } from './styles';

interface IProps {
  title: string;
  placeholder?: string;
  setCollapsedPanel: (collapsedPanel: string) => void;
}

const ColumnHeader: FC<IProps> = ({ title, setCollapsedPanel, placeholder = 'Search' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCLick = () => {
    setCollapsedPanel(!isOpen ? 'collapse' : '');
    setIsOpen(!isOpen);
  };

  const handleChange = (e: ChangeEvent) => {
    setInputValue((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <TitleColumn title={title} />
      <Div>
        <InputAnt
          allowClear
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          suffix={!inputValue && <SearchOutlined />}
        />
        {!!setCollapsedPanel && <Button $isOpen={isOpen} icon={<Arrow />} onClick={handleCLick} />}
      </Div>
    </>
  );
};

export default ColumnHeader;
