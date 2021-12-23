import { Router } from 'express';

import studentController from '../controller/student.controller';

const studentRouter = Router();

studentRouter.get('/students', studentController.getStudents);
studentRouter.post('/students/student', studentController.addStudent);

export { studentRouter as studentRoutes };
