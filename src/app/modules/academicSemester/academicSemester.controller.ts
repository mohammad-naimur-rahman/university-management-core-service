import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicSemesterFilterableFiled } from './academicSemester.constants';
import { academicSemesterService } from './academicSemester.service';

const insertIntoDB = catchAsync(async (req, res) => {
  const result = await academicSemesterService.insertIntoDB(req.body);
  sendResponse(res, {
    data: result,
    statusCode: 201,
    message: 'Academic Semester created successfully!',
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFiled);
  const options = pick(req.query, paginationFields);
  const result = await academicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    message: 'Academic Semesters fetched successfully!',
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getById(req.params.id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    message: 'Academic Semester fetched successfully!',
  });
});

const updateDocument = catchAsync(async (req, res) => {
  const result = await academicSemesterService.updateDocument(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    data: result,
    statusCode: 200,
    message: 'Academic Semester fetched successfully!',
  });
});

const deleteById = catchAsync(async (req, res) => {
  const result = await academicSemesterService.deleteById(req.params.id);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    message: 'Academic Semester fetched successfully!',
  });
});

export const academicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getById,
  updateDocument,
  deleteById,
};
