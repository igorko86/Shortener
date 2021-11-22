import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';

import { Tutor } from '../db/entites/Tutor';

export const deleteUnactivatedTutors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createQueryBuilder('tutor')
      .delete()
      .from(Tutor, 'tutor')
      .where('isActive = false')
      .andWhere("created_at <= now() - interval '20 hours'")
      .execute();

    next();
  } catch (error) {
    next(error);
  }
};
