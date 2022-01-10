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

    if (groupId) {
      const group = await Group.findOne({ id: groupId });
      const newStudentGroup = StudentGroup.create({ group, student: savedNewStudentData });

      await newStudentGroup.save();
    }
  }

  async addStudent(data: IAddStudentRequest) {
    const { groupId, studentIds } = data;

    const promisesStudentIds = studentIds.map((studentId) => Student.findOne({ id: studentId }));

    const studentsData = await Promise.all(promisesStudentIds);
    const group = await Group.findOne({ id: groupId });

    const newStudentGroups = studentsData.map((student) => {
      const newStudentGroup = StudentGroup.create({ group, student });

      return newStudentGroup.save();
    });

    await Promise.all(newStudentGroups);
  }

  async getStudentsById(tutorId: string) {
    const students = await Student.createQueryBuilder('student')
      .select(['student.id', 'student.name'])
      .where('student.tutor = :tutorId', { tutorId })
      .getMany();

    return students;
  }

  async getStudentsInGroup(groupId: string): Promise<IGetStudentsInGroupResponse[]> {
    const studentGroups = await StudentGroup.createQueryBuilder('studentGroup')
      .select(['studentGroup.id', 'student.name', 'student.id'])
      .leftJoin('studentGroup.student', 'student')
      .where('studentGroup.groupId = :groupId', { groupId })
      .getMany();
    console.log(studentGroups);
    return studentGroups.map((item) => {
      return { id: item.id, studentName: item.student.name, studentId: item.student.id };
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
