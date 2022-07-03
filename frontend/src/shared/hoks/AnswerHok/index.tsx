import { FC, ReactNode } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { VerbForm } from '../../../features/GerundsInfinitives/interfaces';

import { AnswerHokDiv, AnswerIcon } from './styles';

interface IProps {
  children: ReactNode;
  selected: VerbForm | null;
  wordVerbForm: VerbForm;
}

const AnswerHok: FC<IProps> = ({ children, selected, wordVerbForm }) => {
  const getAnswerIcon = () =>
    selected === wordVerbForm ? (
      <AnswerIcon isCorrect>
        <CheckOutlined />
      </AnswerIcon>
    ) : (
      <AnswerIcon isCorrect={false}>
        <CloseOutlined />
      </AnswerIcon>
    );
  const answerIcon = selected !== null ? getAnswerIcon() : null;

  return (
    <AnswerHokDiv>
      {answerIcon}
      {children}
    </AnswerHokDiv>
  );
};

export default AnswerHok;
