import { useEffect, useMemo, useState } from 'react';

import Switcher from './Switcher';
import Answer from './Answer';
import data from './gerund_infitive.json';
import Item from './Item';
import { IData, VerbForm } from './interfaces';
import { shuffle } from '../../shared/utils/shuffle';
import NavPanel from './NavPanel';

import { MainDiv } from './styles';

const GerundsInfinitives = () => {
  const [count, setCount] = useState(0);
  const [answer, setAnswer] = useState<VerbForm | null>(null);
  const [isShuffle, setIsShuffle] = useState<null | boolean>(false);
  const [content, setContent] = useState<IData[]>([]);
  const { isAnswer, selected, verbForm, word, example } = useMemo(() => content[count] || {}, [count, content]);

  useEffect(() => {
    if (!content.length || isShuffle) {
      setContent(shuffle(data));
      setIsShuffle(false);
      setCount(0);
    }
  }, [isShuffle]);

  useEffect(() => {
    if (answer !== null) {
      setContent((prev) => {
        const updatedItems = [...prev];

        updatedItems[count] = {
          ...prev[count],
          isAnswer: true,
          selected: answer,
        };

        return updatedItems;
      });
      setAnswer(null);
    }
  }, [answer, count]);

  return (
    <MainDiv>
      <NavPanel onConfirm={setIsShuffle} />
      <Item word={word} example={example} isAnswer={isAnswer} />
      <Answer
        disabled={!content.length || isAnswer}
        selected={selected}
        wordVerbForm={verbForm}
        setAnswer={setAnswer}
      />
      <Switcher setCount={setCount} count={count} maxLength={content.length} />
    </MainDiv>
  );
};

export default GerundsInfinitives;
