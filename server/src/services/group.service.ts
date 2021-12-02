import { IGroupAndPlanRequest, IGroupAndPlanResponse } from './interfaces';
import { Group } from '../db/entites/Group';
import planService from './plan.service';

class GroupService {
  async createGroupAndPlan(data: IGroupAndPlanRequest): Promise<IGroupAndPlanResponse> {
    const { planName, groupName } = data;

    const newGroup = Group.create({
      groupName,
    });

    const { groupName: savedGroupName, id } = await newGroup.save();

    const planData = await planService.createPlan(planName, id);

    return {
      groupName: savedGroupName,
      id,
      plan: planData,
    };
  }

  async getGroups(): Promise<any> {
    const result = await Group.createQueryBuilder('group').select(['group.id', 'group.groupName']).getMany();

    return result;
  }
}

export default new GroupService();
