import { NextFunction, Request, Response } from 'express';

import planCardService from '../services/planCard.service';
import planService from '../services/plan.service';
import subCardService from '../services/subCard.service';

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

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async movePlanCardId(req: Request, res: Response, next: NextFunction) {
    try {
      await planService.movePlanCardId(req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async moveSubCard(req: Request, res: Response, next: NextFunction) {
    try {
      await subCardService.moveSubCard(req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteSubCard(req: Request, res: Response, next: NextFunction) {
    try {
      const { newIds, cardId, subCardId } = req.body;
      await subCardService.deleteSubCard({ cardId, libraryCardId: subCardId });
      await planCardService.updatePlanCardIds({ cardId, newIds });

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
  async updatePlanName(req: Request, res: Response, next: NextFunction) {
    try {
      await planService.updatePlanName(req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
  async updateCardName(req: Request, res: Response, next: NextFunction) {
    try {
      await planService.updateCardName(req.body);

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export default new PlanController();
