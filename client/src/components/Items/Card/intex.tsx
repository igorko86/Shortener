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
  isRemove?: boolean;
  onClick?: any;
  isDescription?: boolean;
}

const Card: FC<IProps> = ({ card, isDragging, onClick, drag, isRemove, isDescription }) => {
  const { title, description } = card;

  return (
    <DivCard ref={drag} isOpacity={isDragging}>
      <div>
        <SpanTitle>{title}</SpanTitle>
        {isDescription && <SpanDescription>{description}</SpanDescription>}
      </div>
      {isRemove && <Button onClick={onClick} icon={<Close />} />}
    </DivCard>
  );
};

export default Card;
