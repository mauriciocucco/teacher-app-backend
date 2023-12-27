import { Test, TestingModule } from '@nestjs/testing';
import { StudentToWorkController } from './student-to-work.controller';
import { StudentToWorkService } from './student-to-work.service';

describe('StudentToWorkController', () => {
  let controller: StudentToWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentToWorkController],
      providers: [StudentToWorkService],
    }).compile();

    controller = module.get<StudentToWorkController>(StudentToWorkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
