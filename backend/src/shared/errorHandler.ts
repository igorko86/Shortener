export const VALIDATION_ERROR = 'Validation error';
export const ACTIVATION_LINK_ERROR = 'the activation link is incorrect';
export const ACTIVATE_ERROR = 'Please, Activate your account';

export const LOGIN_ERROR = 'Email or Password is incorrect';
export const UNAUTHORIZED = 'Unauthorized';
export const EXIST_EMAIL = 'Sorry, Email exists';

interface IErrorType {
  status: number;
  message: ErrorMessage;
}

export type ErrorMessage =
  | typeof UNAUTHORIZED
  | typeof VALIDATION_ERROR
  | typeof ACTIVATION_LINK_ERROR
  | typeof ACTIVATE_ERROR
  | typeof LOGIN_ERROR
  | typeof EXIST_EMAIL;

export const getErrorCode = (message: ErrorMessage): IErrorType => {
  switch (message) {
    case VALIDATION_ERROR:
    case ACTIVATION_LINK_ERROR:
    case ACTIVATE_ERROR:
    case LOGIN_ERROR:
    case EXIST_EMAIL:
      return {
        status: 400,
        message,
      };
    case UNAUTHORIZED:
      return {
        status: 401,
        message,
      };
  }
};
