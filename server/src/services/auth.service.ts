import bcrypt from 'bcrypt';

import { Tutor } from '../db/entites/Tutor';
import mailService from './mail.service';
import tokenService from './token.service';
import { ITutorData, IRequestCompany, ITokenInfo } from './types.services';
import apiErrorService from './apiError.service';
import ApiErrorService from './apiError.service';
import { ACTIVATE_ERROR, ACTIVATION_LINK_ERROR, PASSWORD_ERROR } from './constants.service';
import { Token } from '../db/entites/Token';

class AuthService {
  async registrationTutor(data: IRequestCompany) {
    const { name: tutorName, email: tutorEmail, password } = data;
    const tutor = await Tutor.findOne({ email: tutorEmail });

    if (tutor) {
      throw apiErrorService.badRequest(`Company with such "${tutorEmail}" email exists`);
    }

    const hashPassword = bcrypt.hashSync(String(password), 10);
    const newTutor = Tutor.create({
      email: tutorEmail,
      password: hashPassword,
      name: tutorName,
    });
    const savedTutor = await newTutor.save();
    const { id, email } = savedTutor;
    const activationLink = `${process.env.SERVER_URL}/api/auth/activation/${id}`;

    await mailService.sendActivationMail(email, activationLink);
  }

  async activateTutor(id: string) {
    const tutor = await Tutor.findOne(id);

    if (!tutor || tutor.isActive) {
      throw ApiErrorService.badRequest(ACTIVATION_LINK_ERROR);
    }
    tutor.isActive = true;

    await tutor.save();
  }

  async login(email: string, password: string): Promise<ITutorData> {
    const tutor = await Tutor.findOne({ email });

    if (!tutor) {
      throw ApiErrorService.badRequest(`Tutor with such "${email}" email doesn't exist`);
    } else if (!tutor.isActive) {
      throw ApiErrorService.badRequest(ACTIVATE_ERROR);
    }

    const isPassEquals = await bcrypt.compare(String(password), String(tutor.password));

    if (!isPassEquals) {
      throw ApiErrorService.badRequest(PASSWORD_ERROR);
    }
    const tokens = await tokenService.generateSaveTokens(tutor);
    const { id, email: tutorEmail, name } = tutor;

    return {
      tutor: {
        id,
        email: tutorEmail,
        name,
      },
      ...tokens,
    };
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(tokenInfo: ITokenInfo): Promise<ITutorData> {
    if (!tokenInfo) {
      throw ApiErrorService.unauthorized();
    }

    const { token: refreshToken, id: refreshTokenId } = tokenInfo;
    const tutorData = tokenService.validateToken(refreshToken, process.env.JWT_REFRESH_SECRET as unknown as string);
    const tokenFromDB = Token.findOne({ refreshToken, id: refreshTokenId });

    if (!tutorData || !tokenFromDB) {
      throw ApiErrorService.unauthorized();
    }

    const tutor = await Tutor.findOne(tutorData.id);

    if (!tutor) {
      throw ApiErrorService.unauthorized();
    }

    const tokens = await tokenService.generateSaveTokens(tutor, tokenInfo);

    return {
      tutor: {
        ...tutor,
      },
      ...tokens,
    };
  }
}

export default new AuthService();
