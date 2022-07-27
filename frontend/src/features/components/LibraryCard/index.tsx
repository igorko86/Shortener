import { FC } from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypeCard } from '../../../shared/interfaces';

import { CardDiv, TitleSpan, DescriptionSpan } from './styles';

interface IProps {
  id: string;
  name: string;
  description: string;
  libraryCardIndex: number;
}

const LibraryCard: FC<IProps> = ({ id, name, description, libraryCardIndex }) => {
  const [_, drag] = useDrag({
    type: ItemTypeCard.LIBRARY_CARD,
    item: { id, libraryCardIndex },
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <CardDiv ref={drag}>
      <TitleSpan>{name}</TitleSpan>
      <DescriptionSpan>{description}</DescriptionSpan>
    </CardDiv>
  );
};

export default LibraryCard;
