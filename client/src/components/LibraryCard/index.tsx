// External
import { FC } from 'react';
import { useDrag } from 'react-dnd';
// Internal
import { ItemTypeCard, LibraryCardType } from 'pages/Home/Plan/interfaces';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { cardContentLoadingSelector } from 'store/reducers/library/selectors';
import Card from '../Items/Card';
import useCheckAccess from '../../shared/hooks/useCheckAccess';
import { Role } from '../../shared/models/request/authRequest';

interface IProps {
  card: LibraryCardType;
  libraryCardIndex: number;
}

const LibraryCard: FC<IProps> = ({ card, libraryCardIndex }) => {
  const { setActiveCardId } = useActionCreator();
  const loadingCard = useAppSelector(cardContentLoadingSelector);
  const forbidDrag = useCheckAccess([Role.Admin, Role.Tutor]);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.LIBRARY_CARD,
    item: { id: card.id, libraryCardIndex },
    canDrag: forbidDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleShowContent = () => {
    if (!loadingCard) {
      setActiveCardId(card.id);
    }
  };

  return <Card isDragging={isDragging} drag={drag} card={card} isDescription onShowContent={handleShowContent} />;
};

export default LibraryCard;
