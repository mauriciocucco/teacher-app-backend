import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentToWorkService } from './student-to-work.service';
import { CreateStudentToWorkDto } from './dto/create-student-to-work.dto';
import { UpdateStudentToWorkDto } from './dto/update-student-to-work.dto';

@Controller('student-to-work')
export class StudentToWorkController {
  constructor(private readonly studentToWorkService: StudentToWorkService) {}

  @Post()
  create(@Body() createStudentToWorkDto: CreateStudentToWorkDto) {
    return this.studentToWorkService.create(createStudentToWorkDto);
  }

  @Get()
  findAll() {
    return this.studentToWorkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentToWorkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentToWorkDto: UpdateStudentToWorkDto) {
    return this.studentToWorkService.update(+id, updateStudentToWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentToWorkService.remove(+id);
  }
}
