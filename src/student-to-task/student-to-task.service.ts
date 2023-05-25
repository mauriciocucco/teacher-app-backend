import { Injectable } from '@nestjs/common';
import { CreateStudentToTaskDto } from './dto/create-student-to-task.dto';
import { UpdateStudentToTaskDto } from './dto/update-student-to-task.dto';

@Injectable()
export class StudentToTaskService {
  create(createStudentToTaskDto: CreateStudentToTaskDto) {
    return 'This action adds a new studentToTask';
  }

  findAll() {
    return `This action returns all studentToTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentToTask`;
  }

  update(id: number, updateStudentToTaskDto: UpdateStudentToTaskDto) {
    return `This action updates a #${id} studentToTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentToTask`;
  }
}
