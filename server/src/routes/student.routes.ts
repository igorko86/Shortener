import { Router } from 'express';

import studentController from '../controller/student.controller';

const studentRouter = Router();

studentRouter.get('', studentController.getStudentsById);
studentRouter.post('/student', studentController.addNewStudent);
studentRouter.delete('', studentController.deleteStudentsByIds);
studentRouter.get('/student-groups', studentController.getStudentsInGroup);
studentRouter.post('/student-group', studentController.addStudent);
studentRouter.delete('/student-groups', studentController.deleteStudentInGroupByIds);

export { studentRouter as studentRoutes };
