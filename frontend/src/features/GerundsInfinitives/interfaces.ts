export enum VerbForm {
  Gerund,
  BareInfinitive,
  Infinitive,
}

export interface IData {
  id: number;
  word: string;
  example: string;
  verbForm: VerbForm;
  isAnswer: boolean;
  selected: null | VerbForm;
}
