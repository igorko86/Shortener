export interface ICreateExerciseResponse {
  name: string;
  id: string;
}

export interface IGetExerciseByIdResponse {
  id: string;
  name: string;
  type: string;
  content: any[];
}
