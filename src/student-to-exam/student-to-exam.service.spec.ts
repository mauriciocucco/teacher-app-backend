import { Test, TestingModule } from '@nestjs/testing';
import { StudentToExamService } from './student-to-exam.service';

describe('StudentToExamService', () => {
  let service: StudentToExamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentToExamService],
    }).compile();

    service = module.get<StudentToExamService>(StudentToExamService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
