// External
import { FC } from 'react';
// Internal
import Close from 'shared/assets/icons/close';
import { DivCard, SpanDescription, SpanTitle } from './styles';
import Button from '../Button';
import { ISubCard } from '../../Plan';

interface IProps {
  card: ISubCard;
  isDragging?: boolean;
  drag?: any;
  isRemove?: boolean;
  onClick?: any;
}

const Card: FC<IProps> = ({ card, isDragging, onClick, drag, isRemove }) => {
  const { title, description } = card;

  return (
    <DivCard ref={drag} isOpacity={isDragging}>
      <div>
        <SpanTitle>{title}</SpanTitle>
        <SpanDescription>{description}</SpanDescription>
      </div>
      {isRemove && <Button onClick={onClick} icon={<Close />} />}
    </DivCard>
  );
};

export default Card;
