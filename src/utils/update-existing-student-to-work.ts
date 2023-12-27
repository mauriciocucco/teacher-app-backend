import { StudentToWork } from '../student-to-work/entities/student-to-work.entity';
import { UpdateStudentToWorkDto } from '../student-to-work/dto/update-student-to-work.dto';

export const updateExistingStudentToWork = (
  existingArray: StudentToWork[],
  newArray: UpdateStudentToWorkDto[],
) => {
  newArray.forEach((newStudentToWork) => {
    const index = existingArray.findIndex(
      ({ studentId }) => studentId === newStudentToWork.studentId,
    );

    if (index !== -1) {
      (existingArray[index] as StudentToWork).markingId =
        newStudentToWork.markingId ??
        (existingArray[index] as StudentToWork).markingId;

      (existingArray[index] as StudentToWork).onTime =
        newStudentToWork.onTime ??
        (existingArray[index] as StudentToWork).onTime;

      (existingArray[index] as StudentToWork).score =
        newStudentToWork.score ?? (existingArray[index] as StudentToWork).score;

      existingArray[index].observation =
        newStudentToWork.observation ?? existingArray[index].observation;
    }
  });
};
