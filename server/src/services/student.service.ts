import { User } from '../db/entites/User';
import userService from './user.service';
import { Role } from './interfaces';
import { Student } from '../db/entites/Student';

class StudentService {
  async addNewStudent(data: any) {
    const { email, name, groupId = null } = data;
    const userData = await User.findOne({ email });

    if (!userData) {
      const link = `${process.env.SERVER_URL}/password/${Role.Student}/`;

      await userService.register({ email, name, role: Role.Student, password: name }, link);
    } else {
      await User.update({ id: userData.id }, { role: Role.Student });
    }
    const newStudent = Student.create({ groupId });

    await newStudent.save();
  }
}

export default StudentService;
