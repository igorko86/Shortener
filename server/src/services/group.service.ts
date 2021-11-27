import { IGroupRequest } from './types';
import { Group } from '../db/entites/Group';
import planService from './plan.service';

class GroupService {
  async createGroup(data: IGroupRequest): Promise<any> {
    const { planName, groupName } = data;

    const newPlanData = await planService.createPlan(planName);

    const newGroup = Group.create({
      groupName,
      planId: newPlanData.id,
      plan: newPlanData,
    });

    const { groupName: name, plan } = await newGroup.save();

    return {
      groupName: name,
      planName: plan.planName,
      planId: plan.id,
    };
  }

  async getGroups(): Promise<any> {
    const result = await Group.createQueryBuilder('group')
      .select(['group.id', 'group.groupName', 'group.planId'])
      .getMany();

    return result;
  }
}

export default new GroupService();
