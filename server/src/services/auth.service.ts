import bcrypt from 'bcrypt';

import { Company } from '../db/entites/Company';
import mailService from './mail.service';
import tokenService from './token.service';
import { ICompanyData, IRequestCompany, ITokenInfo } from './types.services';
import apiErrorService from './apiError.service';
import ApiErrorService from './apiError.service';
import { ACTIVATE_ERROR, ACTIVATION_LINK_ERROR, PASSWORD_ERROR } from './constants.service';
import { Token } from '../db/entites/Token';

class AuthService {
  async registrationCompany(data: IRequestCompany) {
    const { name: companyName, email: companyEmail, password } = data;
    const company = await Company.findOne({ email: companyEmail });

    if (company) {
      throw apiErrorService.badRequest(`Company with such "${companyEmail}" email exists`);
    }

    const hashPassword = bcrypt.hashSync(String(password), 10);
    const newCompany = Company.create({
      email: companyEmail,
      password: hashPassword,
      name: companyName,
    });
    const savedCompany = await newCompany.save();
    const { id, email } = savedCompany;
    const activationLink = `${process.env.SERVER_URL}/api/auth/activation/${id}`;

    await mailService.sendActivationMail(email, activationLink);
  }

  async activateCompany(id: string) {
    const company = await Company.findOne(id);

    if (!company || company.isActive) {
      throw ApiErrorService.badRequest(ACTIVATION_LINK_ERROR);
    }
    company.isActive = true;

    await company.save();
  }

  async login(email: string, password: string): Promise<ICompanyData> {
    const company = await Company.findOne({ email });

    if (!company) {
      throw ApiErrorService.badRequest(`Company with such "${email}" email doesn't exist`);
    } else if (!company.isActive) {
      throw ApiErrorService.badRequest(ACTIVATE_ERROR);
    }

    const isPassEquals = await bcrypt.compare(String(password), String(company.password));

    if (!isPassEquals) {
      throw ApiErrorService.badRequest(PASSWORD_ERROR);
    }
    const tokens = await tokenService.generateSaveTokens(company);
    const { id, email: companyEmail, name } = company;

    return {
      company: {
        id,
        email: companyEmail,
        name,
      },
      ...tokens,
    };
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(tokenInfo: ITokenInfo): Promise<ICompanyData> {
    if (!tokenInfo) {
      throw ApiErrorService.unauthorized();
    }

    const { token: refreshToken, id: refreshTokenId } = tokenInfo;
    const companyData = tokenService.validateToken(refreshToken, process.env.JWT_REFRESH_SECRET as unknown as string);
    const tokenFromDB = Token.findOne({ refreshToken, id: refreshTokenId });

    if (!companyData || !tokenFromDB) {
      throw ApiErrorService.unauthorized();
    }

    const company = await Company.findOne(companyData.id);

    if (!company) {
      throw ApiErrorService.unauthorized();
    }

    const tokens = await tokenService.generateSaveTokens(company, tokenInfo);
    const { id, email, name } = company;

    return {
      company: {
        id,
        email,
        name,
      },
      ...tokens,
    };
  }
}

export default new AuthService();
