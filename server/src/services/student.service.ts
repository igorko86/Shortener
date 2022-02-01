import { User } from '../db/entites/User';
import { Role } from './interfaces';
import { Student } from '../db/entites/Student';
import { Group } from '../db/entites/Group';
import { StudentGroup } from '../db/entites/StudentGroup';
import { IGetStudentsInGroupResponse } from '../models/response/student.response.';
import { IAddNewStudentRequest, IAddStudentRequest } from '../models/request/student.request.';
import {
  registerExistsStudentWithGroupMailHtml,
  registerNewStudentMailHtml,
  registerStudentMailHtml,
  registerStudentWithGroupMailHtml,
} from './common/mailHtmls';
import { generatePassword } from '../helpers';
import mailService from './mail.service';
import { ACTIVATION } from './common/links';
import apiErrorService from './apiError.service';
import authService from './auth.service';
import { Tutor } from '../db/entites/Tutor';

class StudentService {
  async addNewStudent(data: IAddNewStudentRequest) {
    const { email, name, groupId, userId } = data;

    let userData = await User.findOne({ email });

    if (userData && userData.id === userId) {
      throw apiErrorService.badRequest(`Sorry, you can not add a user with such email.`);
    }
    const role = Role.Student;
    let password = '';

    if (!userData) {
      password = generatePassword();
      userData = await authService.register({
        email,
        password,
        name,
        role,
      });
    } else {
      await User.update({ id: userId }, { role });
    }
    const isNewUser = !!password;
    let html = '';
    const link = `${process.env.SERVER_URL}${ACTIVATION}/${role}/${userData.id}`;
    const user = await User.findOne({ id: userId });
    const tutor = await Tutor.findOne({ user });
    const student = await Student.findOne({ user: userData });

    if (student) {
      throw apiErrorService.badRequest('Student with such email already exists!');
    }
    const newStudent = Student.create({
      name,
      user: userData,
      tutor,
    });

    await newStudent.save();

    if (!user) {
      throw apiErrorService.badRequest(`Something went wrong!`);
    }

    if (groupId) {
      const group = await Group.findOne({ id: groupId });
      const student = await Student.findOne({ user: userData });

      if (!group) {
        throw apiErrorService.badRequest(`Something went wrong!`);
      }
      const studentInGroup = await StudentGroup.findOne({ student });

      if (studentInGroup) {
        throw apiErrorService.badRequest(`The Student with such email is already in such a group`);
      }
      const newStudentGroup = StudentGroup.create({ group, student });

      await newStudentGroup.save();

      if (isNewUser) {
        html = registerStudentWithGroupMailHtml({ link, password, groupName: group.groupName, tutorName: user.name });
      } else {
        html = registerExistsStudentWithGroupMailHtml({ groupName: group.groupName, tutorName: user.name });
      }
    } else if (isNewUser) {
      html = registerNewStudentMailHtml({ link, password, tutorName: user.name });
    } else {
      html = registerStudentMailHtml({ tutorName: user.name });
    }

    await mailService.sendActivationMail(email, html);
  }

  async addStudent(data: IAddStudentRequest): Promise<void> {
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

  async getStudentsById(userId: string) {
    const students = await Student.createQueryBuilder('student')
      .select(['student.id', 'student.name'])
      .leftJoin('student.tutor', 'tutor')
      .where('tutor.user = :userId', { userId })
      .getMany();

    return students;
  }

  async getStudentsInGroup(groupId: string): Promise<IGetStudentsInGroupResponse[]> {
    const studentGroups = await StudentGroup.createQueryBuilder('studentGroup')
      .select(['studentGroup.id', 'student.name', 'student.id'])
      .leftJoin('studentGroup.student', 'student')
      .where('studentGroup.groupId = :groupId', { groupId })
      .getMany();

    return studentGroups.map((item) => {
      return { id: item.id, studentName: item.student?.name, studentId: item.student?.id };
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
