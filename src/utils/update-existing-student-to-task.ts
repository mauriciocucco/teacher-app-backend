import { UpdateStudentToTaskDto } from '../student-to-task/dto/update-student-to-task.dto';
import { StudentToTask } from '../student-to-task/entities/student-to-task.entity';
import { WorkType } from '../enums/work-type.enum';
import { UpdateStudentToExamDto } from 'src/student-to-exam/dto/update-student-to-exam.dto';
import { StudentToExam } from '../student-to-exam/entities/student-to-exam.entity';

export const updateExistingStudentToTask = (
  existingArray: StudentToTask[] | StudentToExam[],
  newArray: UpdateStudentToTaskDto[] | UpdateStudentToExamDto[],
  workType = WorkType.TASK,
) => {
  newArray.forEach((newStudentToTask) => {
    const index = existingArray.findIndex(
      ({ studentId }) => studentId === newStudentToTask.studentId,
    );

    if (index !== -1) {
      workType === WorkType.TASK
        ? ((existingArray[index] as StudentToTask).markingId =
            newStudentToTask.markingId ??
            (existingArray[index] as StudentToTask).markingId)
        : (existingArray[index].marking =
            newStudentToTask.marking ?? existingArray[index].marking);

      if (workType === WorkType.TASK)
        (existingArray[index] as StudentToTask).onTime =
          newStudentToTask.onTime ??
          (existingArray[index] as StudentToTask).onTime;

      existingArray[index].observation =
        newStudentToTask.observation ?? existingArray[index].observation;
    }
  });
};
