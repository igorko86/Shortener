import { FC } from 'react';
import { List } from 'antd';

import Column from '../Column';
import LibraryCard from '../LibraryCard';

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  name: string;
}

export type LibraryCardType = Omit<ISubCard, 'cardId'>;

interface IProps {
  setIsLibraryOpen: (val: boolean) => void;
}

const Library: FC<IProps> = ({ setIsLibraryOpen }) => {
  const handleClickNewCard = () => {
    console.log('ADD CARD');
  };

  return (
    <Column
      cards={[]}
      title="Library"
      buttonText="+ Create card"
      onClickAdd={handleClickNewCard}
      textItem="cards"
      setIsOpenPanel={setIsLibraryOpen}
      searchDataByValue={() => console.log('Search Data')}
    >
      {[].map((card: LibraryCardType, index: number) => {
        return (
          <List.Item key={card.id}>
            <LibraryCard {...card} libraryCardIndex={index} />
          </List.Item>
        );
      })}
    </Column>
  );
};

export default Library;
