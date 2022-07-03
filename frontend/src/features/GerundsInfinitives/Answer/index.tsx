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

const Answer: FC<IProps> = ({ setAnswer, disabled, selected, wordVerbForm }) => {
  const getSelectedVerbForm = (answerButton: VerbForm) => (selected === answerButton ? selected : null);

  return (
    <AnswerDiv size="large">
      <AnswerHok selected={getSelectedVerbForm(VerbForm.Infinitive)} wordVerbForm={wordVerbForm}>
        <AnswerButton disabled={disabled} onClick={() => setAnswer(VerbForm.Infinitive)}>
          infinitive
        </AnswerButton>
      </AnswerHok>
      <AnswerHok selected={getSelectedVerbForm(VerbForm.BareInfinitive)} wordVerbForm={wordVerbForm}>
        <AnswerButton disabled={disabled} onClick={() => setAnswer(VerbForm.BareInfinitive)}>
          bare infinitive
        </AnswerButton>
      </AnswerHok>
      <AnswerHok selected={getSelectedVerbForm(VerbForm.Gerund)} wordVerbForm={wordVerbForm}>
        <AnswerButton disabled={disabled} onClick={() => setAnswer(VerbForm.Gerund)}>
          gerund
        </AnswerButton>
      </AnswerHok>
    </AnswerDiv>
  );
};

export default Answer;
