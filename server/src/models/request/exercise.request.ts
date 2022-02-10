import { Type } from '../../services/interfaces';

export interface ICreateExerciseRequest {
  name: string;
  type: Type;
  content: any[];
  exerciseType: string;
  userId?: string;
}

export interface IUpdateExerciseRequest {
  id: string;
  content: any[];
}
