import { User } from '../db/entites/User';
import { Role } from './interfaces';
import { Student } from '../db/entites/Student';
import { Group } from '../db/entites/Group';
import { Tutor } from '../db/entites/Tutor';
import { StudentGroup } from '../db/entites/StudentGroup';
import ApiErrorService from './apiError.service';
import { IGetStudentsInGroupResponse } from '../models/response/student.response.';
import { IAddNewStudentRequest, IAddStudentRequest } from '../models/request/student.request.';
import { registerStudentMailHtml } from './common/mailHtmls';
import { generatePassword } from '../helpers';
import mailService from './mail.service';
import { Token } from '../db/entites/Token';
import StudentAuthService from './studentAuth.service';
import { ACTIVATION } from './common/links';

class StudentService {
  async addNewStudent(data: IAddNewStudentRequest) {
    // const { email, name, groupId, tutorId } = data;
    //
    // let userData = await User.findOne({ email });
    // const role = Role.Student;
    // let password = '';
    //
    // if (!userData) {
    //   password = generatePassword();
    //
    //   userData = await StudentAuthService.getInstance().register({
    //     email,
    //     password,
    //     name,
    //     role,
    //   });
    // } else {
    //   await User.update({ id: userData.id }, { role });
    //   await Token.delete({ userTutorId: userData.id });
    // }
    // const tutor = await Tutor.findOne({ id: tutorId });
    // const currentStudent = await Student.findOne({ user: userData });
    //
    // if (!tutor) {
    //   throw ApiErrorService.badRequest(`Tutor with such ${tutorId} id doesn't exist`);
    // }
    // if (currentStudent) {
    //   throw ApiErrorService.badRequest(`Student with such ${email} email exists in list of our students`);
    // }
    // const newStudent = Student.create({ name, user: userData, tutor });
    //
    // const savedNewStudentData = await newStudent.save();
    // let group;
    //
    // if (groupId) {
    //   group = await Group.findOne({ id: groupId });
    //   const newStudentGroup = StudentGroup.create({ group, student: savedNewStudentData });
    //
    //   await newStudentGroup.save();
    // }
    // const link = `${process.env.SERVER_URL}${ACTIVATION}${role}/${userData.id}`;
    // const html = registerStudentMailHtml({ link, password, groupName: group?.groupName, tutorName: tutor.name });
    //
    // await mailService.sendActivationMail(email, html);
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
