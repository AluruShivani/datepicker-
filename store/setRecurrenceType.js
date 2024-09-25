// store/datePickerStore.test.js

import useDatePickerStore, { RECURRENCE_TYPES } from './datePickerStore';

describe('datePickerStore', () => {
  it('should set the recurrence type correctly', () => {
    const { setRecurrenceType, recurrenceType } = useDatePickerStore.getState();
    
    expect(recurrenceType).toBe(RECURRENCE_TYPES.DAILY);

    setRecurrenceType(RECURRENCE_TYPES.WEEKLY);
    expect(useDatePickerStore.getState().recurrenceType).toBe(RECURRENCE_TYPES.WEEKLY);
  });

  it('should update customOptions correctly', () => {
    const { setInterval, setDaysOfWeek, customOptions } = useDatePickerStore.getState();

    setInterval(2);
    expect(useDatePickerStore.getState().customOptions.interval).toBe(2);

    setDaysOfWeek(['Monday', 'Wednesday']);
    expect(useDatePickerStore.getState().customOptions.daysOfWeek).toEqual(['Monday', 'Wednesday']);
  });

  it('should reset options correctly', () => {
    const { setRecurrenceType, setInterval, resetOptions } = useDatePickerStore.getState();

    setRecurrenceType(RECURRENCE_TYPES.YEARLY);
    setInterval(5);
    resetOptions();

    expect(useDatePickerStore.getState().recurrenceType).toBe(RECURRENCE_TYPES.DAILY);
    expect(useDatePickerStore.getState().customOptions.interval).toBe(1);
    expect(useDatePickerStore.getState().customOptions.daysOfWeek).toEqual([]);
    expect(useDatePickerStore.getState().customOptions.nthDay).toBeNull();
  });
});
