import { FC } from 'react';

import { ExampleP, TextDiv } from './styles';

interface IProps {
  word: string;
  example: string;
  isAnswer: boolean;
  isPlayed: boolean;
}

const Item: FC<IProps> = ({ word, isAnswer, example, isPlayed }) => {
  return (
    <>
      <TextDiv>
        <span>{word}</span>
      </TextDiv>
      <ExampleP>{(isAnswer || !isPlayed) && example}</ExampleP>
    </>
  );
};

export default Item;
