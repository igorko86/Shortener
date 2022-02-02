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
  async #createStudent(data: { name: string; user: User; tutor: Tutor }): Promise<Student> {
    const newStudent = Student.create(data);

    return await newStudent.save();
  }

  async #createStudentInGroup(data: { group: Group; student: Student }) {
    const newStudentInGroup = StudentGroup.create(data);

    await newStudentInGroup.save();
  }

  async addNewStudent(data: IAddNewStudentRequest): Promise<void> {
    const { email, name, groupId, userId } = data;

    let userData = await User.findOne({ email });

    if (userData && userData.id === userId) {
      throw apiErrorService.badRequest(`Sorry, you can not add a user with such email.`);
    }
    const role = Role.Student;
    let html = '';

    if (!userData) {
      const password = generatePassword();
      const userTutor = await User.findOne({ id: userId });
      const tutor = await Tutor.findOne({ user: userTutor });

      if (!userTutor || !tutor) {
        throw apiErrorService.badRequest(`Something went wrong!`);
      }

      userData = await authService.register({
        email,
        password,
        name,
        role,
      });

      const newStudent = await this.#createStudent({ name, user: userData, tutor });
      const link = `${process.env.SERVER_URL}${ACTIVATION}/${role}/${userData.id}`;

      if (groupId) {
        const group = await Group.findOne({ id: groupId });

        if (!group) {
          throw apiErrorService.badRequest(`Something went wrong!`);
        }

        await this.#createStudentInGroup({ group, student: newStudent });

        html = registerStudentWithGroupMailHtml({
          link,
          password,
          groupName: group.groupName,
          tutorName: userTutor.name,
        });
      } else {
        html = registerNewStudentMailHtml({ link, password, tutorName: userTutor.name });
      }
    } else {
      await User.update({ id: userData.id }, { role });

      if (groupId) {
        const student = await Student.findOne({ user: userData });
        const group = await Group.findOne({ id: groupId });
        const userTutor = await User.findOne({ id: userId });

        if (!group || !student || !userTutor) {
          throw apiErrorService.badRequest(`Something went wrong!`);
        }

        if (student) {
          const studentInGroup = await StudentGroup.findOne({ student, group });

          if (studentInGroup) {
            throw apiErrorService.badRequest(`The Student with such email already exists in such a group`);
          }
        } else {
          const tutor = await Tutor.findOne({ user: userTutor });

          if (!tutor) {
            throw apiErrorService.badRequest(`Something went wrong!`);
          }
          await this.#createStudent({ name, user: userData, tutor });
        }
        const newStudentGroup = StudentGroup.create({ group, student });

        await newStudentGroup.save();

        html = registerExistsStudentWithGroupMailHtml({ groupName: group.groupName, tutorName: userTutor.name });
      } else {
        const student = await Student.findOne({ user: userData });

        if (student) {
          throw apiErrorService.badRequest('The Student with such email already exists!');
        }
        const userTutor = await User.findOne({ id: userId });
        const tutor = await Tutor.findOne({ user: userTutor });

        if (!tutor || !userTutor) {
          throw apiErrorService.badRequest(`Something went wrong!`);
        }

        await this.#createStudent({ name, user: userData, tutor });

        html = registerStudentMailHtml({ tutorName: userTutor.name });
      }
    }

    mailService.sendActivationMail(email, html);
  }

  async addStudent(data: IAddStudentRequest): Promise<void> {
    const { groupId, studentIds } = data;

    const promisesStudentIds = studentIds.map((studentId) => {
      return Student.createQueryBuilder('student')
        .select(['student', 'user.email'])
        .leftJoin('student.user', 'user')
        .where('student.id = :studentId', { studentId })
        .getOne();
    });

    const studentsData = await Promise.all(promisesStudentIds);
    const group = await Group.createQueryBuilder('group')
      .select(['group', 'tutor.name'])
      .leftJoin('group.tutor', 'tutor')
      .where('group.id = :groupId', { groupId })
      .getOne();

    if (!group) {
      throw apiErrorService.badRequest(`Something went wrong!`);
    }

    const [newStudentGroups, emails] = studentsData.reduce(
      (acc: [Promise<StudentGroup>[], Promise<any>[]], student) => {
        const newStudentGroup = StudentGroup.create({ group, student });
        const html = registerExistsStudentWithGroupMailHtml({
          groupName: group.groupName,
          tutorName: group.tutor.name,
        });

        acc[0].push(newStudentGroup.save());
        acc[1].push(mailService.sendActivationMail(student?.user?.email || '', html));

        return acc;
      },
      [[], []]
    );

    await Promise.all([...newStudentGroups, ...emails]);
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
