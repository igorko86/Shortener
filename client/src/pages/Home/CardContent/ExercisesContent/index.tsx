// External
import { useState } from 'react';
// Internal
import ExerciseList from '../ExerciseList';
import { useAppSelector } from 'shared/hooks/storeHooks';
import { cardContentSelector } from 'store/reducers/library/selectors';
import Exercise from '../Exercise';
// Styles

const ExercisesContent = () => {
  const { exercisesList } = useAppSelector(cardContentSelector);
  const [showExercise, setShoExercise] = useState(false);

  const handleShowExercise = () => {
    setShoExercise(!showExercise);
  };

  return (
    <>
      {showExercise ? (
        <Exercise onShowExercise={handleShowExercise} />
      ) : (
        <ExerciseList exercisesList={exercisesList} onShowExercise={handleShowExercise} />
      )}
    </>
  );
};

export default ExercisesContent;
