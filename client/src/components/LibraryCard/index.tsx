// External
import { FC } from 'react';
import { useDrag } from 'react-dnd';
// Internal
import { ItemTypeCard, LibraryCardType } from 'components/Plan/interfaces';
import { useActionCreator } from 'shared/hooks/useActionCreator';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { cardContentLoadingSelector } from 'store/reducers/library/selectors';
import Card from '../Items/Card';

interface IProps {
  card: LibraryCardType;
  libraryCardIndex: number;
}

const LibraryCard: FC<IProps> = ({ card, libraryCardIndex }) => {
  const { setActiveCardId } = useActionCreator();
  const loadingCard = useAppSelector(cardContentLoadingSelector);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.LIBRARY_CARD,
    item: { id: card.id, libraryCardIndex },
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
