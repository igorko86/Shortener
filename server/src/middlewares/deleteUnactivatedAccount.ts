import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';

import { Tutor } from '../db/entites/Tutor';
import { User } from '../db/entites/User';
import { Student } from '../db/entites/Student';
import { IAuthRole, Role } from '../services/interfaces';

const deleteUnactivatedUsers = async () => {
  await createQueryBuilder('user')
    .delete()
    .from(User, 'user')
    .where('isActive = false')
    .andWhere("created_at <= now() - interval '20 hours'")
    .execute();
};

export const deleteUnactivatedAccount = (req: Request, res: Response, next: NextFunction) => {
  try {
    deleteUnactivatedUsers();

    next();
  } catch (error) {
    next(error);
  }
};
