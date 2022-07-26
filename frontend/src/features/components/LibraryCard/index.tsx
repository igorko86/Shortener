import { FC } from 'react';
import { useDrag } from 'react-dnd';

import useCheckAccess from '../../../shared/hooks/useCheckAccess';
import Card from '../Card';

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  name: string;
}
export type LibraryCardType = Omit<ISubCard, 'cardId'>;

export enum ItemTypeCard {
  CARD = 'Card',
  SUB_CARD = 'SubCard',
  LIBRARY_CARD = 'LibraryCard',
}
interface IProps {
  card: LibraryCardType;
  libraryCardIndex: number;
}

const LibraryCard: FC<IProps> = ({ card, libraryCardIndex }) => {
  const forbidDrag = useCheckAccess(['tutor', 'learner']);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypeCard.LIBRARY_CARD,
    item: { id: card.id, libraryCardIndex },
    canDrag: forbidDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleShowContent = () => {
    // if (!loadingCard) {
    //   setActiveCardId(card.id);
    // }
  };

  return <Card isDragging={isDragging} drag={drag} card={card} isDescription onShowContent={handleShowContent} />;
};

export default LibraryCard;
