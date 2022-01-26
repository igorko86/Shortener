// External
import { FC, useState } from 'react';
import { Collapse, Space } from 'antd';
// Internal
import Button from '../Button';
// Styles
import { ColumnWrapper, ListWrapper } from './styles';
import ColumnHeader from '../ColumnHeader';

interface IProps {
  cards: any;
  title: string;
  onClickAdd?: any;
  buttonText?: string;
  isOpen?: boolean;
  setIsOpen?: (val: boolean) => void;
  textItem?: string;
  placeholder?: string;
}

const Column: FC<IProps> = ({ placeholder, cards, title, onClickAdd, buttonText, textItem = '', children }) => {
  const [collapsedPanel, setCollapsedPanel] = useState('');

  return (
    <ColumnWrapper>
      <Collapse activeKey={collapsedPanel} destroyInactivePanel={true}>
        <Collapse.Panel
          header={<ColumnHeader title={title} setCollapsedPanel={setCollapsedPanel} placeholder={placeholder} />}
          key="collapse"
          showArrow={false}
        >
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
            {!!cards.length && children}
          </ListWrapper>
        </Collapse.Panel>
      </Collapse>

      {onClickAdd && (
        <Space size="middle" style={{ justifyContent: 'space-between' }}>
          <Button onClick={onClickAdd} text={buttonText} />
          {!!cards.length && (
            <div>
              {cards.length} {textItem}
            </div>
          )}
        </Space>
      )}
    </ColumnWrapper>
  );
};

export default Column;
