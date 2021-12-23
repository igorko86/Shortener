import { Router } from 'express';

import CourseController from '../controller/course.controller';

const courseRouter = Router();

courseRouter.post('', CourseController.createCourse);

export { courseRouter as courseRoutes };
