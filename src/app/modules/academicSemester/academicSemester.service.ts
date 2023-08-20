/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { IGenericResponse } from './../../../interfaces/common';
import { academicSemesterSearchableFields } from './academicSemester.constants';
import { AcademicSemesterFilters } from './academicSemester.interface';

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
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
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
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  return {
    data: result,
    meta: {
      total: result.length,
      limit,
      page,
    },
  };
};

const getById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: { id },
  });
  return result;
};

const updateDocument = async (
  id: string,
  payload: Partial<AcademicSemester>
): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.delete({
    where: { id },
  });
  return result;
};

export const academicSemesterService = {
  insertIntoDB,
  getAllFromDB,
  getById,
  deleteById,
  updateDocument,
};
