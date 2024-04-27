import { addDays, addHours, addMinutes } from 'date-fns';

export const calculateExpirationDate = (duration: DurationOptions): Date => {
  const currentDate = new Date();

  switch (duration.type) {
    case 'days':
      return addDays(currentDate, duration.value);
    case 'hours':
      return addHours(currentDate, duration.value);
    case 'minutes':
      return addMinutes(currentDate, duration.value);
    default:
      throw new Error('Invalid duration type');
  }
};

interface DurationOptions {
  type: 'days' | 'hours' | 'minutes';
  value: number;
}