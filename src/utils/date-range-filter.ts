import { FindExamsFiltersDto } from 'src/exams/dto/find-exams-filters.dto';
import { FindTasksFiltersDto } from 'src/tasks/dto/find-tasks-filters.dto';
import { Between } from 'typeorm';

export const addDateRange = (
  cleanedFilters: FindExamsFiltersDto | FindTasksFiltersDto,
) => {
  if (!cleanedFilters.startDate && !cleanedFilters.endDate) return;

  const deepCopy = JSON.parse(JSON.stringify(cleanedFilters));
  const { startDate, endDate } = deepCopy;
  let start: Date | string = new Date(+startDate);
  let end: Date | string = new Date(+endDate);

  start = new Date(start.setDate(start.getDate() - 1)).toISOString(); //le resto un día por que el Between es (x,y), no [x,y]
  end = new Date(end.setDate(end.getDate() + 1)).toISOString(); //le sumo un día por que el Between es (x,y), no [x,y]

  deepCopy.date = Between(start, end);

  delete deepCopy.startDate;
  delete deepCopy.endDate;

  return deepCopy;
};
