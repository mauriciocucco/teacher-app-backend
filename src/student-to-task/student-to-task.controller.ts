import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentToTaskService } from './student-to-task.service';
import { CreateStudentToTaskDto } from './dto/create-student-to-task.dto';
import { UpdateStudentToTaskDto } from './dto/update-student-to-task.dto';

@Controller('student-to-task')
export class StudentToTaskController {
  constructor(private readonly studentToTaskService: StudentToTaskService) {}

  @Post()
  create(@Body() createStudentToTaskDto: CreateStudentToTaskDto) {
    return this.studentToTaskService.create(createStudentToTaskDto);
  }

  @Get()
  findAll() {
    return this.studentToTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentToTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentToTaskDto: UpdateStudentToTaskDto) {
    return this.studentToTaskService.update(+id, updateStudentToTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentToTaskService.remove(+id);
  }
}
