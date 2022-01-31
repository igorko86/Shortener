import bcrypt from 'bcrypt';

import { IUserRequest } from '../models/request/auth.request';
import UserAuthService from './user.service';
import { User } from '../db/entites/User';

export default class StudentAuthService extends UserAuthService {
  private static instance: StudentAuthService;

  static getInstance() {
    if (!this.instance) {
      this.instance = new StudentAuthService();
    }

    return this.instance;
  }

  async register(data: IUserRequest): Promise<User> {
    const { name: userName, email: userEmail, password } = data;

    const hashPassword = bcrypt.hashSync(String(password), 10);
    const newUser = User.create({
      email: userEmail,
      password: hashPassword,
      name: userName,
    });
    const savedUser = await newUser.save();

    return savedUser;
  }
}
