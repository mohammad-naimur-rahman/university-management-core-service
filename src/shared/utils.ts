import { WeekDays } from '@prisma/client';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const asyncForEach = async <T>(arr: Array<T>, cb: any) => {
  if (!Array.isArray(arr)) {
    throw new Error('Exprected an array!');
  }
  for (let index = 0; index < arr.length; index++) {
    await cb(arr[index], index, arr);
  }
};

export const hasTimeConflict = (
  existingSlots: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }[],
  newSlot: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }
) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
