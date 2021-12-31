import { User } from '../db/entites/User';
import userService from './user.service';
import { IAddNewStudent, Role } from './interfaces';
import { Student } from '../db/entites/Student';
import { Group } from '../db/entites/Group';
import { Tutor } from '../db/entites/Tutor';

class StudentService {
  async addNewStudent(data: IAddNewStudent) {
    const { email, name, groupId, tutorId } = data;

    let userData = await User.findOne({ email });

    if (!userData) {
      const link = `${process.env.SERVER_URL}/password/${Role.Student}/`;

      userData = await userService.register({ email, name, role: Role.Student, password: name }, link);
    } else {
      await User.update({ id: userData.id }, { role: Role.Student });
    }
    const group = await Group.findOne({ id: groupId });
    const tutor = await Tutor.findOne({ id: tutorId });

    const newStudent = Student.create({ name, user: userData, group, tutor });

    await newStudent.save();
  }

  async getStudentsById(id: any) {
    return await Student.find({
      where: [{ tutor: id }, { group: id }],
    });
  }

  async deleteStudentByIds(ids: string[]) {
    await Student.delete(ids);
  }
}

export default new StudentService();
