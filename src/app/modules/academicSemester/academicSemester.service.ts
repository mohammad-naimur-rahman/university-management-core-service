import { AcademicSemester, PrismaClient } from '@prisma/client';
import { IGenericResponse } from './../../../interfaces/common';

const prisma = new PrismaClient();

const insertIntoDB = async (
  data: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({ data });
  return result;
};

const getAllFromDB = async (): Promise<
  IGenericResponse<AcademicSemester[]>
> => {
  const result = await prisma.academicSemester.findMany();
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
