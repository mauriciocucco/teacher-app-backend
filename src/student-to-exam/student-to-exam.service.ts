import { Injectable } from '@nestjs/common';
import { CreateStudentToExamDto } from './dto/create-student-to-exam.dto';
import { UpdateStudentToExamDto } from './dto/update-student-to-exam.dto';

@Injectable()
export class StudentToExamService {
  create(createStudentToExamDto: CreateStudentToExamDto) {
    return 'This action adds a new studentToExam';
  }

  findAll() {
    return `This action returns all studentToExam`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentToExam`;
  }

  update(id: number, updateStudentToExamDto: UpdateStudentToExamDto) {
    return `This action updates a #${id} studentToExam`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentToExam`;
  }
}
