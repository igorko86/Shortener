import { IGroupAndPlanRequest } from './interfaces';
import { Group } from '../db/entites/Group';
import { Tutor } from '../db/entites/Tutor';

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

  async getGroupsById(tutorId: string, search: string): Promise<any> {
    const query = Group.createQueryBuilder('group')
      .select(['group.id', 'group.groupName'])
      .where('group.tutorId = :tutorId', { tutorId });

    if (search) {
      query.andWhere('group.groupName like :value', { value: `%${search}%` });
    }

    return await query.getMany();
  }
}

export default new GroupService();
