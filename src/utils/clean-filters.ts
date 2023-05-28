export type Filters = {
  [key: string]: string | number;
};

export const cleanFilters = (filters: Filters) => {
  const filtersDeepCopy = JSON.parse(JSON.stringify(filters));

  for (const key in filtersDeepCopy) {
    if (filtersDeepCopy[key] === '0') {
      delete filtersDeepCopy[key];
    }
  }

  return filtersDeepCopy;
};
