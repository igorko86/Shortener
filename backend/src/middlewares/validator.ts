import { body } from 'express-validator';

export const authValidator = (nameMethod: string) => {
  switch (nameMethod) {
    case 'register': {
      return [
        body('name', 'Name is required field').not().isEmpty(),
        body('email', 'Invalid email').isEmail().normalizeEmail(),
        body('password', 'Invalid password').not().isEmpty(),
      ];
    }
    default:
      return [];
  }
};
