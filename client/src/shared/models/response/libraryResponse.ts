import { Type } from '../../common/enum';

export interface ILibraryCardResponse {
  id: string;
  name: string;
  description: string;
}

export interface ICardContentResponse {
  htmlContent: string;
  name: string;
  description: string;
}

export interface IExerciseResponse {
  id: string;
  name: string;
  type: Type;
  exerciseType: string;
}

export interface IExerciseContentResponse {
  id: string;
  name: string;
  exerciseType: string;
  content: any[];
}
