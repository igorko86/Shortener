import { NextFunction, Request, Response } from 'express';

import groupService from '../services/group.service';

class GroupController {
  async getGroupsById(req: Request, res: Response, next: NextFunction) {
    try {
      const groups = await groupService.getGroupsById(req.query.tutorId);

      return res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  }
}

export default new GroupController();
