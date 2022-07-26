import { useState } from 'react';

import ExerciseList from '../ExerciseList';
import Exercise from '../Exercise';

const ExercisesContent = () => {
  const [showExercise, setShoExercise] = useState(false);

  const handleShowExercise = () => {
    setShoExercise(!showExercise);
  };

  return (
    <>
      {showExercise ? (
        <Exercise onShowExercise={handleShowExercise} />
      ) : (
        <ExerciseList exercisesList={[]} onShowExercise={handleShowExercise} />
      )}
    </>
  );
};

export default ExercisesContent;
