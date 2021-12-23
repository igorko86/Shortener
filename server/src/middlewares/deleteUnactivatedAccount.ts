import { NextFunction, Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';

import { Tutor } from '../db/entites/Tutor';
import { User } from '../db/entites/User';
import { Student } from '../db/entites/Student';
import { IAuthRole, Role } from '../services/interfaces';

const deleteUnactivatedTutors = async () => {
  await createQueryBuilder('tutor')
    .delete()
    .from(Tutor, 'tutor')
    .where('isActive = false')
    .andWhere("created_at <= now() - interval '20 hours'")
    .execute();
};

const deleteUnactivatedUsers = async () => {
  await createQueryBuilder('user')
    .delete()
    .from(User, 'user')
    .where('isActive = false')
    .andWhere("created_at <= now() - interval '20 hours'")
    .execute();
};

const deleteUnactivatedStudents = async () => {
  await createQueryBuilder('student')
    .delete()
    .from(Student, 'student')
    .where('isActive = false')
    .andWhere("created_at <= now() - interval '20 hours'")
    .execute();
};

const unactivatedAction = {
  [Role.Tutor]: deleteUnactivatedTutors,
  [Role.Viewer]: deleteUnactivatedUsers,
  // [Role.Student]: deleteUnactivatedStudents,
};

export const deleteUnactivatedAccount = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.params;

    if (role === Role.Viewer) {
      unactivatedAction[Role.Viewer]();
    } else {
      // @ts-ignore
      unactivatedAction[role as unknown as IAuthRole]();
    }

    next();
  } catch (error) {
    next(error);
  }
};
