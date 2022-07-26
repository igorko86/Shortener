import { FC } from 'react';

import { DivCard, SpanDescription, SpanTitle } from './styles';

export interface ISubCard {
  id: string;
  cardId?: string;
  description: string;
  name: string;
}

interface IProps {
  card: ISubCard;
  isDragging?: boolean;
  drag?: any;
  onRemove?: (e: any) => void;
  isDescription?: boolean;
  onShowContent: () => void;
}

const Card: FC<IProps> = ({ onShowContent, card, isDragging, onRemove, drag, isDescription }) => {
  const { name, description } = card;

  return (
    <DivCard ref={drag} isOpacity={isDragging} onClick={onShowContent}>
      <div>
        <SpanTitle>{name}</SpanTitle>
        <SpanDescription>{description}</SpanDescription>
      </div>
    </DivCard>
  );
};

export default Card;
