import { IGroupAndPlanRequest } from './interfaces';
import { Group } from '../db/entites/Group';
import { Tutor } from '../db/entites/Tutor';
import { Student } from '../db/entites/Student';
import { User } from '../db/entites/User';
import { mapGroupsByStudent } from './mapper';
import apiErrorService from './apiError.service';

class GroupService {
  async createGroup(data: IGroupAndPlanRequest): Promise<Group> {
    const { groupName, userId } = data;

    const user = await User.findOne({ id: userId });

    if (!user) {
      throw apiErrorService.badRequest(`User doesn't exist`);
    }
    const tutor = await Tutor.findOne({ user });

    const newGroup = Group.create({
      groupName,
      tutor,
    });

    return newGroup.save();
  }

  async getGroupsByTutorId(userId: string, search: string): Promise<null | { groupName: string; id: string }[]> {
    const query = Tutor.createQueryBuilder('tutor')
      .select(['tutor.id', 'group.groupName', 'group.id'])
      .leftJoin('tutor.groups', 'group')
      .where('tutor.user = :userId', { userId });

    if (search) {
      query.andWhere('group.groupName ILIKE :value', { value: `%${search}%` });
    }

    const result = await query.getOne();

    return result?.groups || null;
  }

  async getGroupsByStudentId(studentId: string, search: string): Promise<null | { groupName: string; id: string }[]> {
    const query = Student.createQueryBuilder('student')
      .select(['student.id', 'studentGroups.id', 'group.id', 'group.groupName'])
      .leftJoin('student.studentGroups', 'studentGroups')
      .leftJoin('studentGroups.group', 'group')
      .where('student.userId = :userId', { userId: studentId });

    if (search) {
      query.andWhere('group.groupName ILIKE :value', { value: `%${search}%` });
    }

    const data = await query.getOne();

    return data ? mapGroupsByStudent(data.studentGroups) : null;
  }
}

export default new GroupService();
