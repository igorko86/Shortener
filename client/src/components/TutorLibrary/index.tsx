// External
import { FC, useEffect, useState } from 'react';
import { List } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { myLibraryCardsSelector } from 'store/reducers/library/selectors';
import { LibraryCardType } from '../Plan/interfaces';
import LibraryCard from '../LibraryCard';
import Column from '../Items/Column';
// Styles

interface IProps {
  setIsTutorLibraryOpen: (val: boolean) => void;
}

const TutorLibrary: FC<IProps> = ({ setIsTutorLibraryOpen }) => {
  const myLibraryCards = useAppSelector(myLibraryCardsSelector);
  const { getMyLibraryCards } = useActionCreator();

  useEffect(() => {
    getMyLibraryCards();
  }, []);

  return (
    <Column
      cards={myLibraryCards}
      title="My Library"
      buttonText="+ Add card"
      onClickAdd={() => console.log('hellooo')}
      setIsOpenPanel={setIsTutorLibraryOpen}
      textItem="cards"
      searchDataByValue={getMyLibraryCards}
    >
      {myLibraryCards.map((card: LibraryCardType, index: number) => {
        return (
          <List.Item key={card.id}>
            <LibraryCard card={card} libraryCardIndex={index} />
          </List.Item>
        );
      })}
    </Column>
  );
};

export default TutorLibrary;
