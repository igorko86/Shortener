import { NextFunction, Request, Response } from 'express';

class StudentController {
  async getStudents(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json('planData');
    } catch (error) {
      next(error);
    }
  }
  async addStudent(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json('planData');
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();
