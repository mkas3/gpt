import { useMemo } from 'react';

export const useFormattedDate = (
  date: Date | string,
  formatter?: (date: Date) => number,
) => {
  return useMemo(() => {
    const newDate =
      typeof date === 'string' ? new Date(Date.parse(date)) : date;
    if (formatter) newDate.setDate(formatter(newDate));

    return newDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, [date]);
};
