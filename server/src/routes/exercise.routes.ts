import { Router } from 'express';

import exerciseController from '../controller/exercise.controller';

const exerciseRouter = Router();

exerciseRouter.get('', exerciseController.getExercisesList);
exerciseRouter.get('/new-card', exerciseController.getExercisesByUserId);
exerciseRouter.get('/exercise', exerciseController.getExerciseById);
exerciseRouter.post('/exercise', exerciseController.createExercise);
exerciseRouter.put('/exercise', exerciseController.updateExercise);
exerciseRouter.delete('/exercise', exerciseController.deleteExercisesById);

export { exerciseRouter as exerciseRoutes };
