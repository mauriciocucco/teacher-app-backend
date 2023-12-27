import { FindExamsFiltersDto } from 'src/exams/dto/find-exams-filters.dto';
import { FindTasksFiltersDto } from 'src/tasks/dto/find-tasks-filters.dto';
import { Between } from 'typeorm';
import { FindStudentsFiltersDto } from '../students/dto/find-students-filters.dto';

export const addDateRange = (
  cleanedFilters:
    | FindExamsFiltersDto
    | FindTasksFiltersDto
    | FindStudentsFiltersDto,
) => {
  if (!cleanedFilters.startDate && !cleanedFilters.endDate)
    return cleanedFilters;

  const deepCopy = JSON.parse(JSON.stringify(cleanedFilters));
  const { startDate, endDate } = deepCopy;
  let start: Date | string = new Date(+startDate);
  let end: Date | string = new Date(+endDate);

  start = new Date(start.setMinutes(start.getMinutes() - 1)).toISOString(); //le resto un minuto por que el Between es (x,y), no [x,y]
  end = new Date(end.setMinutes(end.getMinutes() + 1)).toISOString(); //le sumo un minuto por que el Between es (x,y), no [x,y]

  deepCopy.date = Between(start, end);

  delete deepCopy.startDate;
  delete deepCopy.endDate;

  return deepCopy;
};
