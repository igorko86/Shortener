export interface ICreateExerciseRequest {
  name: string;
  type: string;
  content: any[];
}

export interface IUpdateExerciseRequest {
  id: string;
  content: any[];
}
