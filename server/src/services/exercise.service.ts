import { Student } from '../db/entites/Student';
import { ICreateExerciseRequest, IUpdateExerciseRequest } from '../models/request/exercise.request';
import { Exercise } from '../db/entites/Exercise';
import {
  ICreateExerciseResponse,
  IGetExerciseByIdResponse,
  IGetExerciseListResponse,
} from '../models/response/exercise.response.';
import apiErrorService from './apiError.service';
import { Tutor } from '../db/entites/Tutor';
import { User } from '../db/entites/User';
import { Type } from './interfaces';

class ExerciseService {
  async createExercise(data: ICreateExerciseRequest): Promise<ICreateExerciseResponse> {
    const { name: exerciseName, type, content, exerciseType, userId } = data;

    const user = await User.findOne({ id: userId });
    const tutor = await Tutor.findOne({ user });

    const exercise = Exercise.create({
      name: exerciseName,
      type,
      exerciseType,
      content,
      tutor,
    });

    const { name, id, type: savedType, exerciseType: savedExerciseType } = await exercise.save();

    return {
      name,
      id,
      type: savedType,
      exerciseType: savedExerciseType,
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

    const { name, type, content, id, exerciseType } = exerciseData;

    return {
      id,
      name,
      type,
      content,
      exerciseType,
    };
  }

  async getExercisesList(cardId: string): Promise<IGetExerciseListResponse[]> {
    return await Exercise.createQueryBuilder('exercise')
      .select('exercise.id')
      .addSelect('exercise.name')
      .addSelect('exercise.type')
      .where('exercise.libraryCardId = :cardId', { cardId })
      .getMany();
  }

  async getExercisesByUserId(userId: string, search: string): Promise<IGetExerciseListResponse[]> {
    const tutor = await Tutor.createQueryBuilder('tutor')
      .select('tutor.id')
      .leftJoin('tutor.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();

    const query = Exercise.createQueryBuilder('exercise').select([
      'exercise.id',
      'exercise.name',
      'exercise.type',
      'exercise.exerciseType',
    ]);

    if (String(search)) {
      query
        .where('exercise.tutor = :tutorId', { tutorId: tutor?.id })
        .andWhere('exercise.type = :type', { type: Type.Public })
        .where('exercise.type ILIKE :type', { type: `%${search}%` })
        .orWhere('exercise.name ILIKE :value', { value: `%${search}%` });
    } else {
      query
        .where('exercise.tutor = :tutorId', { tutorId: tutor?.id })
        .orWhere('exercise.type = :type', { type: Type.Public });
    }

    return await query.getMany();
  }

  async deleteExercisesById(ids: string[]) {
    await Exercise.delete(ids);
  }
}

export default new ExerciseService();
