// External
import { FC, useEffect, useState } from 'react';
import { Collapse, Space } from 'antd';
// Internal
import Button from '../Button';
import ColumnHeader from './ColumnHeader';
// Styles
import { ColumnWrapper, ListWrapper } from './styles';

interface IProps {
  cards: any;
  title: string;
  onClickAdd?: () => void | undefined;
  buttonText?: string;
  setIsOpenPanel?: (val: boolean) => void;
  textItem?: string;
  placeholder?: string;
  searchDataByValue?: (val: string) => void;
}

const Column: FC<IProps> = ({
  searchDataByValue,
  placeholder,
  cards,
  title,
  setIsOpenPanel,
  onClickAdd,
  buttonText,
  textItem = '',
  children,
}) => {
  const [collapsedPanel, setCollapsedPanel] = useState('');

  useEffect(() => {
    if (setIsOpenPanel) {
      setIsOpenPanel(!!collapsedPanel);
    }
  }, [collapsedPanel]);

  return (
    <ColumnWrapper>
      <Collapse activeKey={collapsedPanel} destroyInactivePanel={true}>
        <Collapse.Panel
          header={
            <ColumnHeader
              title={title}
              setCollapsedPanel={setCollapsedPanel}
              placeholder={placeholder}
              searchDataByValue={searchDataByValue}
            />
          }
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

      <Space size="middle" style={{ justifyContent: 'space-between' }}>
        {onClickAdd && <Button onClick={onClickAdd} text={buttonText} />}
        {!!cards.length && (
          <div>
            {cards.length} {textItem}
          </div>
        )}
      </Space>
    </ColumnWrapper>
  );
};

export default Column;
