import { NextFunction, Request, Response } from 'express';
import studentService from '../services/student.service';

class StudentController {
  async getStudentsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { tutorId, groupId } = req.query;
      const students = await studentService.getStudentsById(tutorId || groupId);

      return res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }
  async addNewStudent(req: Request, res: Response, next: NextFunction) {
    try {
      await studentService.addNewStudent(req.body);

      return res.status(200).json('Success');
    } catch (error) {
      next(error);
    }
  }

  async deleteStudentByIds(req: Request, res: Response, next: NextFunction) {
    try {
      await studentService.deleteStudentByIds(req.body.ids);

      return res.status(200).json('Success');
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();
