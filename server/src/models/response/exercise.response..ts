import { Type } from '../../services/interfaces';

export interface ICreateExerciseResponse {
  name: string;
  id: string;
  exerciseType: string;
  type: Type;
}

export interface IGetExerciseByIdResponse {
  id: string;
  name: string;
  type: Type;
  content: any[];
  exerciseType: string;
}

export type IGetExerciseListResponse = ICreateExerciseResponse;
