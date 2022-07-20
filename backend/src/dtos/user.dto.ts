import { User } from '../db/entites/User';
import { UserType } from '../services/interfaces';

class UserDto {
  private name: string;
  private email: string;
  private id: string;
  private type: UserType;

  constructor(userInfo: User) {
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.id = userInfo.id;
    this.type = userInfo.type;
  }
}

export default UserDto;
