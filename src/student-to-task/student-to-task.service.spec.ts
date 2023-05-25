import { Test, TestingModule } from '@nestjs/testing';
import { StudentToTaskService } from './student-to-task.service';

describe('StudentToTaskService', () => {
  let service: StudentToTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentToTaskService],
    }).compile();

    service = module.get<StudentToTaskService>(StudentToTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
