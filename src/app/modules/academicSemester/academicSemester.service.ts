/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from './../../../interfaces/common';
import { academicSemesterSearchableFields } from './academicSemester.constants';
import { AcademicSemesterFilters } from './academicSemester.interface';

const prisma = new PrismaClient();

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};

const getAllFromDB = async (
  filters: AcademicSemesterFilters,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { limit: take, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andCOnditions = [];

  if (searchTerm) {
    andCOnditions.push({
      OR: academicSemesterSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCOnditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andCOnditions.length ? { AND: andCOnditions } : {};

  const result = await prisma.academicSemester.findMany({
    skip,
    take,
    where: whereConditions,
  });
  return {
    data: result,
    meta: {
      total: 10,
      limit: 10,
      page: 1,
    },
  };
};

export const academicSemesterService = {
  insertIntoDB,
  getAllFromDB,
};
