import { Test, TestingModule } from '@nestjs/testing';
import { StudentToExamController } from './student-to-exam.controller';
import { StudentToExamService } from './student-to-exam.service';

describe('StudentToExamController', () => {
  let controller: StudentToExamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentToExamController],
      providers: [StudentToExamService],
    }).compile();

    controller = module.get<StudentToExamController>(StudentToExamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
