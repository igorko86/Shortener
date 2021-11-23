import { Tutor } from '../db/entites/Tutor';

class TutorDto {
  private name: string;
  private email: string;
  private id: string;

  constructor(tutorInfo: Tutor) {
    this.name = tutorInfo.name;
    this.email = tutorInfo.email;
    this.id = tutorInfo.id;
  }
}

export default TutorDto;
