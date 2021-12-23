import { IGroupAndPlanRequest, IGroupAndPlanResponse } from './interfaces';
import planService from './plan.service';
import groupService from './group.service';

class CourseService {
  async createCourse(data: IGroupAndPlanRequest): Promise<IGroupAndPlanResponse> {
    const { groupName, id } = await groupService.createGroup(data);

    const planData = await planService.createPlan(data.planName, id);

    return {
      groupName,
      id,
      plan: planData,
    };
  }
}

export default new CourseService();
