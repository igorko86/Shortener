import { FC, ReactNode } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { VerbForm } from '../../../features/GerundsInfinitives/interfaces';
import { theme } from '../../../theme';

import { AnswerHokDiv, AnswerIcon } from './styles';

interface IProps {
  children: ReactNode;
  selected: VerbForm | null;
  wordVerbForm: VerbForm;
  answerButton: VerbForm;
}

const AnswerHok: FC<IProps> = ({ children, selected, wordVerbForm, answerButton }) => {
  let icon = null;

  if (selected === answerButton && wordVerbForm !== selected) {
    icon = (
      <AnswerIcon color={theme.colors.red}>
        <CloseOutlined />
      </AnswerIcon>
    );
  } else if (selected !== null && wordVerbForm === answerButton) {
    icon = (
      <AnswerIcon color={theme.colors.green}>
        <CheckOutlined />
      </AnswerIcon>
    );
  }

  return (
    <AnswerHokDiv>
      {icon}
      {children}
    </AnswerHokDiv>
  );
};

export default AnswerHok;
