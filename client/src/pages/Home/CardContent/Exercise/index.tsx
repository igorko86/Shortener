// External
import React, { FC } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
// Internal
import Loader from 'components/Loader';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { exerciseContentSelector } from 'store/reducers/library/selectors';
// Styles

interface IProps {
  onShowExercise: () => void;
}

const Exercise: FC<IProps> = ({ onShowExercise }) => {
  const exerciseContent = useAppSelector(exerciseContentSelector);

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
