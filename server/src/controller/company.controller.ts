import { NextFunction, Request, Response } from 'express';
import { Company } from '../db/entites/Company';

class CompanyController {
  async getCompanies(req: Request, res: Response, next: NextFunction) {
    try {
      const companies = await Company.find();

      return res.status(200).json(companies);
    } catch (error) {
      next(error);
    }
  }
}

export default new CompanyController();
