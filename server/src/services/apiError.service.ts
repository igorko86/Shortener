import { ValidationError } from 'express-validator';
import { UNAUTHORIZED } from './constants.service';
import { NextFunction, Request, Response } from 'express';

enum StatusCode {
  BadRequest = 400,
  Unauthorized = 401,
}

class ApiErrorService extends Error {
  readonly status: number;
  readonly errors: ValidationError[];

  constructor(code: number, message: string, errors: ValidationError[] = []) {
    super(message);

    this.status = code;
    this.errors = errors;
  }

  static badRequest(message: string, err?: ValidationError[]) {
    return new ApiErrorService(StatusCode.BadRequest, message, err);
  }

  static unauthorized() {
    return new ApiErrorService(StatusCode.Unauthorized, UNAUTHORIZED);
  }
}

export default ApiErrorService;
