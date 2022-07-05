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

export interface IShowWords {
  0?: string;
  1?: string;
  2?: string;
  all?: string;
}
