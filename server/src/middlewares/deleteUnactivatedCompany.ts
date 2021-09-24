import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';

import { Company } from '../db/entites/Company';

export const deleteUnactivatedCompany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createQueryBuilder('company')
      .delete()
      .from(Company, 'company')
      .where('isActive = false')
      .andWhere("created_at <= now() - interval '20 hours'")
      .execute();

    next();
  } catch (error) {
    next(error);
  }
};
