// External
import { FC } from 'react';
// Internal
import Close from 'shared/assets/icons/close';
import { ISubCard } from 'pages/Home/Plan/interfaces';
import Button from '../Button';
// Styles
import { DivCard, SpanDescription, SpanTitle } from './styles';

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
        {isDescription && <SpanDescription>{description}</SpanDescription>}
      </div>
      {onRemove && <Button onClick={onRemove} data-name="remove" icon={<Close />} />}
    </DivCard>
  );
};

export default Card;
