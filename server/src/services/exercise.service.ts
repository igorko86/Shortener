import { Student } from '../db/entites/Student';
import { ICreateExerciseRequest, IUpdateExerciseRequest } from '../models/request/exercise.request';
import { Exercise } from '../db/entites/Exercise';
import {
  ICreateExerciseResponse,
  IGetExerciseByIdResponse,
  IGetExerciseListResponse,
} from '../models/response/exercise.response.';
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

  async updateExercises(ids: string[], data: any): Promise<void> {
    const arrayEntities = ids.map((id) => Exercise.update(id, data));

    await Promise.allSettled(arrayEntities);
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

  async getExercisesList(cardId: string): Promise<IGetExerciseListResponse[]> {
    return await Exercise.createQueryBuilder('exercise')
      .select('exercise.id')
      .addSelect('exercise.name')
      .where('exercise.libraryCardId = :cardId', { cardId })
      .getMany();
  }

  async deleteExercisesById(ids: string[]) {
    await Exercise.delete(ids);
  }
}

export default new ExerciseService();