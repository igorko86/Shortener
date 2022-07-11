import { NextFunction, Request, Response } from 'express';

import groupService from '../services/group.service';

class GroupController {
  async getGroupsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { tutorId, search = '' } = req.query;
      // const groups = await groupService.getGroupsById(tutorId as string, search as string);

      return res.status(200).json('groupService.getGroupsById');
    } catch (error) {
      next(error);
    }
  }
}

export default new GroupController();
