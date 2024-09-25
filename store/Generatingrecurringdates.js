// utils/generateRecurringDates.js

import { addDays, addWeeks, addMonths, addYears, getDay, setDay } from 'date-fns';
import useDatePickerStore, { RECURRENCE_TYPES } from '../store/datePickerStore';

export function generateRecurringDates() {
  const { recurrenceType, customOptions, dateRange } = useDatePickerStore.getState();
  const { interval, daysOfWeek, nthDay } = customOptions;
  const { startDate, endDate } = dateRange;

  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate || currentDate)) {
    switch (recurrenceType) {
      case RECURRENCE_TYPES.DAILY:
        dates.push(new Date(currentDate));
        currentDate = addDays(currentDate, interval);
        break;

      case RECURRENCE_TYPES.WEEKLY:
        daysOfWeek.forEach((day) => {
          const dayIndex = getDay(new Date(day));
          const nextDate = setDay(currentDate, dayIndex, { weekStartsOn: 1 });
          if (nextDate >= currentDate && (!endDate || nextDate <= new Date(endDate))) {
            dates.push(new Date(nextDate));
          }
        });
        currentDate = addWeeks(currentDate, interval);
        break;

      case RECURRENCE_TYPES.MONTHLY:
        // Implement logic for nth day of the month
        // Example: second Tuesday
        // This requires more detailed date manipulation
        // You can use date-fns or other libraries for this
        break;

      case RECURRENCE_TYPES.YEARLY:
        dates.push(new Date(currentDate));
        currentDate = addYears(currentDate, interval);
        break;

      default:
        break;
    }
  }

  useDatePickerStore.getState().setSelectedDates(dates);
}
