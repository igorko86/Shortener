import { NextFunction, Request, Response } from 'express';
import studentService from '../services/student.service';

class StudentController {
  async getStudentsById(req: Request, res: Response, next: NextFunction) {
    try {
      const students = await studentService.getStudentsById(req.query.tutorId as string);

      return res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  }

  async getStudentsInGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const studentGroupsData = await studentService.getStudentsInGroup(req.query.groupId as string);

      return res.status(200).json(studentGroupsData);
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

  async addStudent(req: Request, res: Response, next: NextFunction) {
    try {
      await studentService.addStudent(req.body);

      return res.status(200).json('Success');
    } catch (error) {
      next(error);
    }
  }

  async deleteStudentInGroupByIds(req: Request, res: Response, next: NextFunction) {
    try {
      await studentService.deleteStudentInGroupByIds(req.body.ids);

      return res.status(200).json('Success');
    } catch (error) {
      next(error);
    }
  }

  async deleteStudentsByIds(req: Request, res: Response, next: NextFunction) {
    try {
      await studentService.deleteStudentsByIds(req.body.ids);

      return res.status(200).json('Success');
    } catch (error) {
      next(error);
    }
  }
}

export default new StudentController();
