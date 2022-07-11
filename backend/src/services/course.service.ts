import { IGroupAndPlanRequest, IGroupAndPlanResponse } from './interfaces';
import planService from './plan.service';
import groupService from './group.service';
import studentService from './student.service';

class CourseService {
  async createCourse(data: IGroupAndPlanRequest): Promise<IGroupAndPlanResponse> {
    const { studentIds, planName } = data;
    const { groupName, id } = await groupService.createGroup(data);
    let studentsInGroup = null;

    if (studentIds) {
      await studentService.addStudent({ studentIds, groupId: id });

      studentsInGroup = await studentService.getStudentsInGroup(id);
    }

    const planData = await planService.createPlan(planName, id);

    return {
      groupName,
      id,
      plan: planData,
      studentsInGroup,
    };
  }
}

export default new CourseService();
