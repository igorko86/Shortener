// External
import { FC } from 'react';
import { Space } from 'antd';
// Internal
import TitleColumn from '../TitleColumn';
import Search from 'components/Search';
import Button from '../Button';
// Styles
import { ColumnWrapper, ListWrapper } from './styles';

interface IProps {
  cards: any;
  title: string;
  onClickAdd?: any;
  buttonText?: string;
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
  textItem?: string;
}

const Column: FC<IProps> = ({ cards, title, onClickAdd, buttonText, isOpen, setIsOpen, textItem = '', children }) => {
  const listLength = cards.length;

  return (
    <ColumnWrapper>
      <TitleColumn planName={title} />
      <Search setIsOpen={setIsOpen} isOpen={isOpen} />
      {isOpen && (
        <ListWrapper
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 1,
            xl: 1,
            xxl: 1,
          }}
          dataSource={cards}
        >
          {!!listLength && children}
        </ListWrapper>
      )}
      {buttonText && (
        <Space size="middle" style={{ justifyContent: 'space-between' }}>
          <Button onClick={onClickAdd} text={buttonText} />
          {!!listLength && (
            <div>
              {listLength} {textItem}
            </div>
          )}
        </Space>
      )}
    </ColumnWrapper>
  );
};

export default Column;
