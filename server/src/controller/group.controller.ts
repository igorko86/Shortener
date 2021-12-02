import { NextFunction, Request, Response } from 'express';

import groupService from '../services/group.service';

class GroupController {
  async getGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await groupService.getGroups();

      return res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }

  async createGroupAndPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const groupData = await groupService.createGroupAndPlan(req.body);

      return res.status(200).json(groupData);
    } catch (error) {
      next(error);
    }
  }
}

export default new GroupController();
