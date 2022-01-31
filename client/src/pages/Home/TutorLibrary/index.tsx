// External
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { List } from 'antd';
// Internal
import { useAppSelector } from 'shared/hooks/storeHooks';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { myLibraryCardsSelector } from 'store/reducers/library/selectors';
import { LibraryCardType } from 'pages/Home/Plan/interfaces';
import LibraryCard from 'components/LibraryCard';
import Column from 'components/Items/Column';
import { AppPath } from 'shared/common/enum';
import useCheckAccess from 'shared/hooks/useCheckAccess';
import { Role } from 'shared/models/request/authRequest';
import { userSelector } from 'store/reducers/auth/selectors';

// Styles

interface IProps {
  setIsTutorLibraryOpen: (val: boolean) => void;
}

const TutorLibrary: FC<IProps> = ({ setIsTutorLibraryOpen }) => {
  const history = useHistory();
  const myLibraryCards = useAppSelector(myLibraryCardsSelector);
  const user = useAppSelector(userSelector);
  const { getMyLibraryCards } = useActionCreator();
  const show = useCheckAccess([Role.Admin, Role.Tutor]);

  const searchTutorCards = (value: string) => {
    if (user?.role === (Role.Tutor || Role.Admin)) {
      getMyLibraryCards(value);
    }
  };

  const handleClickNewCard = () => {
    history.push(AppPath.NEW_CARD);
  };

  return (
    <Column
      cards={myLibraryCards}
      title="My Library"
      buttonText="+ Create card"
      onClickAdd={show ? handleClickNewCard : undefined}
      setIsOpenPanel={setIsTutorLibraryOpen}
      textItem="cards"
      searchDataByValue={searchTutorCards}
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
