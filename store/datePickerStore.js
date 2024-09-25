// store/datePickerStore.js

import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define the possible recurrence types
export const RECURRENCE_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

// Define the initial state and actions
const useDatePickerStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State Variables
        recurrenceType: RECURRENCE_TYPES.DAILY, // default to daily
        customOptions: {
          interval: 1, // Every X days/weeks/months/years
          daysOfWeek: [], // Selected days for weekly recurrence
          nthDay: null, // e.g., second Tuesday for monthly
        },
        selectedDates: [], // Array of selected Date objects
        dateRange: {
          startDate: null,
          endDate: null,
        },

        // Actions to update the state
        setRecurrenceType: (type) => {
          set({ recurrenceType: type });
        },

        setInterval: (interval) => {
          set((state) => ({
            customOptions: { ...state.customOptions, interval },
          }));
        },

        setDaysOfWeek: (days) => {
          set((state) => ({
            customOptions: { ...state.customOptions, daysOfWeek: days },
          }));
        },

        setNthDay: (nthDay) => {
          set((state) => ({
            customOptions: { ...state.customOptions, nthDay },
          }));
        },

        setSelectedDates: (dates) => {
          set({ selectedDates: dates });
        },

        setDateRange: (range) => {
          set({ dateRange: range });
        },

        // Optional: Reset all options
        resetOptions: () => {
          set({
            recurrenceType: RECURRENCE_TYPES.DAILY,
            customOptions: {
              interval: 1,
              daysOfWeek: [],
              nthDay: null,
            },
            selectedDates: [],
            dateRange: {
              startDate: null,
              endDate: null,
            },
          });
        },
      }),
      {
        name: 'date-picker-storage', // unique name for localStorage
        // Optional: Define which parts of the state to persist
        partialize: (state) => ({
          recurrenceType: state.recurrenceType,
          customOptions: state.customOptions,
          dateRange: state.dateRange,
        }),
      }
    )
  )
);

export default useDatePickerStore;
