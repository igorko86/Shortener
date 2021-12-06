// External
import { FC } from 'react';
// Internal
import Close from 'shared/assets/icons/close';
import { ISubCard } from 'components/Plan/interfaces';
import { DivCard, SpanDescription, SpanTitle } from './styles';
import Button from '../Button';

interface IProps {
  card: ISubCard;
  isDragging?: boolean;
  drag?: any;
  onRemove?: (e: any) => void;
  isDescription?: boolean;
  onShowContent: () => void;
}

const Card: FC<IProps> = ({ onShowContent, card, isDragging, onRemove, drag, isDescription }) => {
  const { title, description } = card;

  return (
    <DivCard ref={drag} isOpacity={isDragging} onClick={onShowContent}>
      <div>
        <SpanTitle>{title}</SpanTitle>
        {isDescription && <SpanDescription>{description}</SpanDescription>}
      </div>
      {onRemove && <Button onClick={onRemove} data-name="remove" icon={<Close />} />}
    </DivCard>
  );
};

export default Card;
