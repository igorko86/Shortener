import { Student } from '../db/entites/Student';
import { ICreateExerciseRequest, IUpdateExerciseRequest } from '../models/request/exercise.request';
import { Exercise } from '../db/entites/Exercise';
import { ICreateExerciseResponse, IGetExerciseByIdResponse } from '../models/response/exercise.response.';
import apiErrorService from './apiError.service';

class ExerciseService {
  async createExercise(data: ICreateExerciseRequest): Promise<ICreateExerciseResponse> {
    const { name: exerciseName, type, content } = data;

    const exercise = Exercise.create({
      name: exerciseName,
      type,
      content,
    });

    const { name, id } = await exercise.save();

    return {
      name,
      id,
    };
  }

  async updateExercise(data: IUpdateExerciseRequest): Promise<void> {
    const { id, content } = data;

    await Exercise.update(id, { content });
  }

  async getExerciseById(exerciseId: string): Promise<IGetExerciseByIdResponse> {
    const exerciseData = await Exercise.findOne(exerciseId);

    if (!exerciseData) {
      throw apiErrorService.badRequest(`Exercise with such ${exerciseId} doesn't exist`);
    }

    const { name, type, content, id } = exerciseData;

    return {
      id,
      name,
      type,
      content,
    };
  }

  async getExercises(id: string) {
    return await Student.find({
      where: [{ libraryCardId: id }],
    });
  }

  async deleteExercisesById(ids: string[]) {
    await Exercise.delete(ids);
  }
}

export default new ExerciseService();
