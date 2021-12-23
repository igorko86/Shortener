import { NextFunction, Request, Response } from 'express';
import courseService from '../services/course.service';

class CourseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const courseData = await courseService.createCourse(req.body);

      return res.status(200).json(courseData);
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
