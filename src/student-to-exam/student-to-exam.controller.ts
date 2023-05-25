import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentToExamService } from './student-to-exam.service';
import { CreateStudentToExamDto } from './dto/create-student-to-exam.dto';
import { UpdateStudentToExamDto } from './dto/update-student-to-exam.dto';

@Controller('student-to-exam')
export class StudentToExamController {
  constructor(private readonly studentToExamService: StudentToExamService) {}

  @Post()
  create(@Body() createStudentToExamDto: CreateStudentToExamDto) {
    return this.studentToExamService.create(createStudentToExamDto);
  }

  @Get()
  findAll() {
    return this.studentToExamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentToExamService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentToExamDto: UpdateStudentToExamDto) {
    return this.studentToExamService.update(+id, updateStudentToExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentToExamService.remove(+id);
  }
}
