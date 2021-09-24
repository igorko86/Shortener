import { Router } from 'express';
import companyController from '../controller/company.controller';

const companyRouter = Router();

companyRouter.get('', companyController.getCompanies);

export { companyRouter as companyRoutes };
