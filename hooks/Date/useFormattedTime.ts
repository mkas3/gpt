import { useMemo } from 'react';

export const useFormattedTime = (date: Date | string) => {
  return useMemo(() => {
    const newDate =
      typeof date === 'string' ? new Date(Date.parse(date)) : date;
    return newDate.toLocaleTimeString('ru-RU', {
      timeStyle: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [date]);
};
