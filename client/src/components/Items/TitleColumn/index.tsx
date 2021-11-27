import { FC } from 'react';
import { SpanTitleColumn, TitleColumnPosition } from './styles';

interface IProps {
  title: string;
  titlePosition?: string;
}

const TitleColumn: FC<IProps> = ({ title, titlePosition }) => {
  return (
    <TitleColumnPosition titlePosition={titlePosition}>
      <SpanTitleColumn>{title}</SpanTitleColumn>
    </TitleColumnPosition>
  );
};

export default TitleColumn;
