import { NextFunction, Request, Response } from 'express';

import exerciseService from '../services/exercise.service';

class ExerciseController {
  async getExercises(req: Request, res: Response, next: NextFunction) {
    try {
      const exercisesData = await exerciseService.getExercises(req.query.cardId as string);

      return res.status(200).json(exercisesData);
    } catch (error) {
      next(error);
    }
  }

  async getExerciseById(req: Request, res: Response, next: NextFunction) {
    try {
      const exerciseData = await exerciseService.getExerciseById(req.query.exerciseId as string);

      return res.status(200).json(exerciseData);
    } catch (error) {
      next(error);
    }
  }

  async createExercise(req: Request, res: Response, next: NextFunction) {
    try {
      const newExerciseData = await exerciseService.createExercise(req.body);

      return res.status(200).json(newExerciseData);
    } catch (error) {
      next(error);
    }
  }

  async updateExercise(req: Request, res: Response, next: NextFunction) {
    try {
      await exerciseService.updateExercise(req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteExercisesById(req: Request, res: Response, next: NextFunction) {
    try {
      await exerciseService.deleteExercisesById(req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export default new ExerciseController();
