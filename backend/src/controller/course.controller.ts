import { NextFunction, Request, Response } from 'express';
import courseService from '../services/course.service';
import groupService from '../services/group.service';

class CourseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseData = await courseService.createCourse(req.body);

      return res.status(200).json(courseData);
    } catch (error) {
      next(error);
    }
  }

  async getCoursesByTutorId(req: Request, res: Response, next: NextFunction) {
    try {
      const { tutorId, search = '' } = req.query;
      const groups = await groupService.getGroupsByTutorId(tutorId as string, search as string);

      return res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }

  async getCoursesByStudentId(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId, search = '' } = req.query;
      const groups = await groupService.getGroupsByStudentId(studentId as string, search as string);

      return res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
