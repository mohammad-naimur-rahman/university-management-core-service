import { AcademicSemester } from '@prisma/client';

export type AcademicSemesterFilters = Partial<AcademicSemester> & {
  searchTerm?: string;
};
