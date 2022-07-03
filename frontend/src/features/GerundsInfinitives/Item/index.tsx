import { FC } from 'react';

import { ExampleP, TextDiv } from './styles';

interface IProps {
  word: string;
  example: string;
  isAnswer: boolean;
}

const Item: FC<IProps> = ({ word, isAnswer, example }) => {
  return (
    <>
      <TextDiv>
        <span>{word}</span>
      </TextDiv>
      <ExampleP>{isAnswer && example}</ExampleP>
    </>
  );
};

export default Item;
