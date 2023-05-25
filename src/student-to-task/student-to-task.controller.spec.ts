import { Test, TestingModule } from '@nestjs/testing';
import { StudentToTaskController } from './student-to-task.controller';
import { StudentToTaskService } from './student-to-task.service';

describe('StudentToTaskController', () => {
  let controller: StudentToTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentToTaskController],
      providers: [StudentToTaskService],
    }).compile();

    controller = module.get<StudentToTaskController>(StudentToTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
