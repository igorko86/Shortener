// External
import { FC, useEffect, useState } from 'react';
import { List } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
import { LibraryCardType } from '../Plan/interfaces';
import LibraryCard from '../LibraryCard';
import Column from '../Items/Column';
// Styles

interface IProps {
  setIsLibraryOpen: (val: boolean) => void;
}

const Library: FC<IProps> = ({ setIsLibraryOpen }) => {
  const libraryCards = useAppSelector(libraryCardsSelector);
  const { getLibraryCards } = useActionCreator();

  useEffect(() => {
    getLibraryCards();
  }, []);

  return (
    <Column
      cards={libraryCards}
      title="Library"
      buttonText="+ Add card"
      onClickAdd={() => console.log('hellooo')}
      textItem="cards"
      setIsOpenPanel={setIsLibraryOpen}
      searchDataByValue={getLibraryCards}
    >
      {libraryCards.map((card: LibraryCardType, index: number) => {
        return (
          <List.Item key={card.id}>
            <LibraryCard card={card} libraryCardIndex={index} />
          </List.Item>
        );
      })}
    </Column>
  );
};

export default Library;
