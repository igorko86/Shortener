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
  setIsTutorLibraryOpen: any;
}

const TutorLibrary: FC<IProps> = ({ setIsTutorLibraryOpen }) => {
  const myLibraryCards = useAppSelector(myLibraryCardsSelector);
  const { getMyLibraryCards } = useActionCreator();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getMyLibraryCards();
  }, []);

  useEffect(() => {
    setIsTutorLibraryOpen(isOpen);
  }, [isOpen]);

  return (
    <Column
      cards={myLibraryCards}
      title="My Library"
      buttonText="+ Add card"
      onClickAdd={() => console.log('hellooo')}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      textItem="cards"
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
