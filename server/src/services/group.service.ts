import { IGroupAndPlanRequest } from './interfaces';
import { Group } from '../db/entites/Group';
import { Tutor } from '../db/entites/Tutor';
import { Student } from '../db/entites/Student';
import { mapGroupsByStudent } from './mapper';

class GroupService {
  async createGroup(data: IGroupAndPlanRequest): Promise<Group> {
    const { groupName, tutorId } = data;

    const tutor = await Tutor.findOne({ id: tutorId });

    const newGroup = Group.create({
      groupName,
      tutor,
    });

    return await newGroup.save();
  }

  async getGroupsByTutorId(tutorId: string, search: string): Promise<any> {
    const query = Group.createQueryBuilder('group')
      .select(['group.id', 'group.groupName'])
      .where('group.tutorId = :tutorId', { tutorId });

    if (search) {
      query.andWhere('group.groupName ILIKE :value', { value: `%${search}%` });
    }

    return await query.getMany();
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
