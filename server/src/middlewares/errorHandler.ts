import { NextFunction, Request, Response } from 'express';
import ErrorHandlerService from '../services/apiError.service';

export const apiErrorHandler = (err: ErrorHandlerService | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorHandlerService) {
    const { status, message, errors } = err;

    return res.status(status).json({ message, errors });
  }

  return res.status(500).json(err.message);
};
