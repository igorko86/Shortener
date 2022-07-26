import React, { FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';

import Loader from '../../../../components/Loader';
// Styles

interface IProps {
  onShowExercise: () => void;
}

const Exercise: FC<IProps> = ({ onShowExercise }) => {
  const exerciseContent = null;
  return (
    <>
      <CloseCircleFilled onClick={onShowExercise} />
      {exerciseContent ? (
        <>
          <div>Exercise content</div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Exercise;
