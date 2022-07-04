import { FC } from 'react';

import { VerbForm } from '../interfaces';

import { AnswerDiv, AnswerButton } from './styles';
import AnswerHok from '../../../shared/hoks/AnswerHok';

interface IProps {
  setAnswer: (answer: VerbForm) => void;
  disabled: boolean;
  selected: VerbForm | null;
  wordVerbForm: VerbForm;
}

const Answer: FC<IProps> = ({ setAnswer, disabled, ...props }) => {
  return (
    <AnswerDiv size="large">
      <AnswerHok {...props} answerButton={VerbForm.Infinitive}>
        <AnswerButton disabled={disabled} onClick={() => setAnswer(VerbForm.Infinitive)}>
          infinitive
        </AnswerButton>
      </AnswerHok>
      <AnswerHok {...props} answerButton={VerbForm.BareInfinitive}>
        <AnswerButton disabled={disabled} onClick={() => setAnswer(VerbForm.BareInfinitive)}>
          bare infinitive
        </AnswerButton>
      </AnswerHok>
      <AnswerHok {...props} answerButton={VerbForm.Gerund}>
        <AnswerButton disabled={disabled} onClick={() => setAnswer(VerbForm.Gerund)}>
          gerund
        </AnswerButton>
      </AnswerHok>
    </AnswerDiv>
  );
};

export default Answer;
