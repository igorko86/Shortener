import { Plan } from '../db/entites/Plan';

class PlanService {
  async createPlan(planName: string): Promise<Plan> {
    const newPlan = Plan.create({ planName });

    return await newPlan.save();
  }
}

export default new PlanService();
