import { Tutor } from '../db/entites/Tutor';
import { User } from '../db/entites/User';
import { Role } from '../services/interfaces';

class UserDto {
  private name: string;
  private email: string;
  private id: string;
  private role: Role;

  constructor(userInfo: Tutor | User) {
    this.name = userInfo.name;
    this.email = userInfo.email;
    this.id = userInfo.id;
    this.role = userInfo.role;
  }
}

export default UserDto;
