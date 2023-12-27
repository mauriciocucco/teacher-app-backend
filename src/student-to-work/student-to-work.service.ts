import { Injectable } from '@nestjs/common';
import { CreateStudentToWorkDto } from './dto/create-student-to-work.dto';
import { UpdateStudentToWorkDto } from './dto/update-student-to-work.dto';

@Injectable()
export class StudentToWorkService {
  create(createStudentToWorkDto: CreateStudentToWorkDto) {
    return 'This action adds a new studentToWork';
  }

  findAll() {
    return `This action returns all studentToWork`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentToWork`;
  }

  update(id: number, updateStudentToWorkDto: UpdateStudentToWorkDto) {
    return `This action updates a #${id} studentToWork`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentToWork`;
  }
}
