export enum Status {
  Success = 200,
  BadRequest = 400,
  Error = 500,
  Unauthorized = 401,
}

export enum UserType {
  Learner = 'learner',
  Tutor = 'tutor',
  Unknown = 'unknown',
}

export enum ItemTypeCard {
  CARD = 'Card',
  SUB_CARD = 'SubCard',
  LIBRARY_CARD = 'LibraryCard',
}
