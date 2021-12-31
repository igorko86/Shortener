import { Router } from 'express';

import studentController from '../controller/student.controller';

const studentRouter = Router();

studentRouter.get('', studentController.getStudentsById);
studentRouter.post('/student', studentController.addNewStudent);
studentRouter.delete('/student', studentController.deleteStudentByIds);

export { studentRouter as studentRoutes };
