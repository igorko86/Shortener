import { User } from '../db/entites/User';
import userService from './user.service';
import { IAddNewStudent, Role } from './interfaces';
import { Student } from '../db/entites/Student';
import { Group } from '../db/entites/Group';
import { Tutor } from '../db/entites/Tutor';
import { StudentGroup } from '../db/entites/StudentGroup';
import ApiErrorService from './apiError.service';
import { IGetStudentsInGroupResponse } from '../models/response/student.response.';
import { IAddNewStudentRequest, IAddStudentRequest } from '../models/request/student.request.';

class StudentService {
  async addNewStudent(data: IAddNewStudentRequest) {
    const { email, name, groupId, tutorId } = data;

    let userData = await User.findOne({ email });

    if (!userData) {
      const link = `${process.env.SERVER_URL}/password/${Role.Student}/`;

      userData = await userService.register({ email, name, role: Role.Student, password: name }, link);
    } else {
      await User.update({ id: userData.id }, { role: Role.Student });
    }
    const tutor = await Tutor.findOne({ id: tutorId });
    const currentStudent = await Student.findOne({ user: userData });

    if (currentStudent) {
      throw ApiErrorService.badRequest(`Student with such ${email} exists`);
    }
    const newStudent = Student.create({ name, user: userData, tutor });

    const savedNewStudentData = await newStudent.save();

    if (!groupId) {
      const group = await Group.findOne({ id: '7940021b-b1aa-41c4-a5e7-1854dac6e898' });
      const newStudentGroup = StudentGroup.create({ group, student: savedNewStudentData });

      await newStudentGroup.save();
    }
  }

  async addStudent(data: IAddStudentRequest) {
    const { groupId, studentId } = data;

    const student = await Student.findOne({ id: studentId });
    const group = await Group.findOne({ id: groupId });

    const newStudentGroup = StudentGroup.create({ group, student });

    await newStudentGroup.save();
  }

  async getStudentsById(id: string) {
    return await Student.find({
      where: [{ tutor: id }],
    });
  }

  async getStudentsInGroup(groupId: string): Promise<IGetStudentsInGroupResponse[]> {
    const studentGroups = await StudentGroup.createQueryBuilder('studentGroup')
      .select(['studentGroup.id', 'student.name'])
      .leftJoin('studentGroup.student', 'student')
      .where('studentGroup.groupId = :groupId', { groupId })
      .getMany();

    return studentGroups.map((item) => {
      return { id: item.id, studentName: item.student.name };
    });
  }

  async deleteStudentInGroupByIds(ids: string[]) {
    await StudentGroup.delete(ids);
  }

  async deleteStudentsByIds(ids: string[]) {
    await Student.delete(ids);
  }
}

export default new StudentService();
