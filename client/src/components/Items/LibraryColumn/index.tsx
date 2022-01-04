// External
import { FC } from 'react';
import { List } from 'antd';
// Internal
import LibraryCard from 'components/LibraryCard/intex';
import ColumnWrapper from '../ColumnWrapper';
import TitleColumn from '../TitleColumn';
import Search from 'components/Search';
// styles
import { ListWrapper } from './styles';
import { LibraryCardType } from 'components/Plan/interfaces';
import Button from '../Button';

interface IProps {
  cards: any;
  title: string;
  handleClick?: any;
  buttonText?: string;
}

const LibraryColumn: FC<IProps> = ({ cards, title, handleClick, buttonText }) => {
  return (
    <ColumnWrapper>
      <TitleColumn planName={title} />
      <Search />
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
        {cards.map((card: LibraryCardType, index: number) => {
          return (
            <List.Item key={card.id}>
              <LibraryCard card={card} libraryCardIndex={index} />
            </List.Item>
          );
        })}
      </ListWrapper>
      {buttonText ? <Button onClick={handleClick} text={buttonText} /> : ''}
    </ColumnWrapper>
  );
};

export default LibraryColumn;
