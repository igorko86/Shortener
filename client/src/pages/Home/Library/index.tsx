// External
import { FC, useEffect } from 'react';
import { List } from 'antd';
import { useHistory } from 'react-router-dom';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { Role } from 'shared/models/request/authRequest';
import { AppPath } from 'shared/common/enum';
import useCheckAccess from 'shared/hooks/useCheckAccess';
import { libraryCardsSelector } from 'store/reducers/library/selectors';
import LibraryCard from 'components/LibraryCard';
import Column from 'components/Items/Column';
import { LibraryCardType } from '../Plan/interfaces';
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
