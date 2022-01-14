import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment-timezone';

import { Tutor } from '../db/entites/Tutor';
import mailService from './mail.service';
import tokenService from './token.service';
import { IGenerateTokensResult, Role } from './interfaces';
import apiErrorService from './apiError.service';
import ApiErrorService from './apiError.service';
import { ACTIVATE_ERROR, ACTIVATION_LINK_ERROR, PASSWORD_ERROR } from './constants';
import { IAuthLoginRequest, IResetPasswordRequest, ITutorRequest } from '../models/request/auth.request';
import { forgotPasswordMailHtml, registerMailHtml } from './common/mailHtmls';
import { ACTIVATION, RESET_PASSWORD } from './common/links';

export default class TutorAuthService {
  async register(data: ITutorRequest) {
    const { name: tutorName, email: tutorEmail, password } = data;
    const tutor = await Tutor.findOne({ email: tutorEmail });

    if (tutor) {
      throw apiErrorService.badRequest(`Sorry, Tutor already exists with such email.`);
    }

    const hashPassword = bcrypt.hashSync(String(password), 10);
    const newTutor = Tutor.create({
      email: tutorEmail,
      password: hashPassword,
      name: tutorName,
    });
    const savedTutor = await newTutor.save();
    const { id, email } = savedTutor;
    const link = `${process.env.SERVER_URL}${ACTIVATION}${Role.Tutor}/${id}`;
    const html = registerMailHtml({ link });

    await mailService.sendActivationMail(email, html);
  }

  async activate(id: string) {
    const tutor = await Tutor.findOne(id);

    if (!tutor || tutor.isActive) {
      throw ApiErrorService.badRequest(ACTIVATION_LINK_ERROR);
    }
    tutor.isActive = true;

    await tutor.save();
  }

  async login({ email, password }: IAuthLoginRequest): Promise<IGenerateTokensResult> {
    const tutor = await Tutor.findOne({ email });

    if (!tutor) {
      throw ApiErrorService.badRequest(`Such email doesn't exist`);
    } else if (!tutor.isActive) {
      throw ApiErrorService.badRequest(ACTIVATE_ERROR);
    }

    const isPassEquals = await bcrypt.compare(String(password), String(tutor.password));

    if (!isPassEquals) {
      throw ApiErrorService.badRequest(PASSWORD_ERROR);
    }

    return await tokenService.generateSaveTokens(tutor);
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(id: string): Promise<IGenerateTokensResult> {
    const tutor = await Tutor.findOne(id);

    if (!tutor) {
      throw ApiErrorService.unauthorized();
    }

    return await tokenService.generateSaveTokens(tutor);
  }

  async forgotPassword(email: string): Promise<void> {
    const tutor = await Tutor.findOne({ email });

    if (!tutor) {
      throw apiErrorService.badRequest(`Sorry, but Tutor with such email doesn't exist`);
    }
    const data = {
      id: tutor.id,
      role: tutor.role,
      expLink: moment().add(20, 'hours'),
    };

    const hash = jwt.sign(data, 'reset-password');
    const link = `${process.env.CLIENT_URL}${RESET_PASSWORD}${tutor.role}/${hash}`;
    const html = forgotPasswordMailHtml({ link });

    await mailService.sendActivationMail(email, html);
  }

  async resetPassword(data: IResetPasswordRequest): Promise<void> {
    const { id, password, role } = data;
    const tutor = await Tutor.findOne({ id, role });

    if (!tutor) {
      throw apiErrorService.badRequest(`Something went wrong!!!`);
    }
    const hashPassword = bcrypt.hashSync(String(password), 10);

    await Tutor.update(tutor.id, { password: hashPassword });
  }
}
