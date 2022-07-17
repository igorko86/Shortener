import { User } from '../db/entites/User';

class UserDto {
  private name: string;
  private email: string;
  private id: string;

  constructor(userInfo: User) {
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.id = userInfo.id;
  }
}

export default UserDto;
