import bcrypt from 'bcrypt';

import { Tutor } from '../db/entites/Tutor';
import mailService from './mail.service';
import tokenService from './token.service';
import { IGenerateTokensResult, Role } from './interfaces';
import apiErrorService from './apiError.service';
import ApiErrorService from './apiError.service';
import { ACTIVATE_ERROR, ACTIVATION_LINK_ERROR, PASSWORD_ERROR } from './constants';
import { IAuthLoginRequest, ITutorRequest } from '../models/request/auth.request';

class TutorService {
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
    const activationLink = `${process.env.SERVER_URL}/api/auth/activation/${Role.Tutor}/${id}`;

    await mailService.sendActivationMail(email, activationLink);
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
      throw ApiErrorService.badRequest(`Such "${email}" email doesn't exist`);
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
}

export default new TutorService();
