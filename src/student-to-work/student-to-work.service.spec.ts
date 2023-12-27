import { Test, TestingModule } from '@nestjs/testing';
import { StudentToWorkService } from './student-to-work.service';

describe('StudentToWorkService', () => {
  let service: StudentToWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentToWorkService],
    }).compile();

    service = module.get<StudentToWorkService>(StudentToWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
