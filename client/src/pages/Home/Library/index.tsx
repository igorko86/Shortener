// External
import { FC, useEffect, useState } from 'react';
import { List } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
import { LibraryCardType } from '../../../components/Plan/interfaces';
import LibraryCard from '../../../components/LibraryCard';
import Column from '../../../components/Items/Column';
import { AppPath } from '../../../shared/common/enum';
import { useHistory } from 'react-router-dom';
import useCheckAccess from '../../../shared/hooks/useCheckAccess';
import { Role } from 'shared/models/request/authRequest';
// Styles

interface IProps {
  setIsLibraryOpen: (val: boolean) => void;
}

const Library: FC<IProps> = ({ setIsLibraryOpen }) => {
  const history = useHistory();
  const libraryCards = useAppSelector(libraryCardsSelector);
  const { getLibraryCards } = useActionCreator();
  const show = useCheckAccess([Role.Admin]);

  useEffect(() => {
    getLibraryCards();
  }, []);

  const handleClickNewCard = () => {
    history.push(AppPath.NEW_CARD);
  };

  return (
    <Column
      cards={libraryCards}
      title="Library"
      buttonText="+ Create card"
      onClickAdd={show ? handleClickNewCard : undefined}
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
