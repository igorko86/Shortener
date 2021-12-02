import { NextFunction, Request, Response } from 'express';

import planCardService from '../services/planCard.service';
import planService from '../services/plan.service';

class PlanController {
  async getPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const planData = await planService.getPlan(req.query.groupId);

      return res.status(200).json(planData);
    } catch (error) {
      next(error);
    }
  }

  async createPlanCardById(req: Request, res: Response, next: NextFunction) {
    try {
      const planData = await planCardService.createPlanCardById(req.query.planId);

      return res.status(200).json(planData);
    } catch (error) {
      next(error);
    }
  }

  async deletePlanCardById(req: Request, res: Response, next: NextFunction) {
    try {
      await planCardService.deletePlanCardById(req.body);

      return res.status(200).json('Success');
    } catch (error) {
      next(error);
    }
  }
}

export default new PlanController();
