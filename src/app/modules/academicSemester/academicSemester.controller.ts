import httpStatus from 'http-status';
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
    statusCode: httpStatus.CREATED,
    message: 'Academic Semester created successfully!',
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicSemesterFilterableFiled);
  const options = pick(req.query, paginationFields);
  const result = await academicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Academic Semesters fetched successfully!',
  });
});

const getById = catchAsync(async (req, res) => {
  const {
    params: { id },
  } = req;
  const result = await academicSemesterService.getById(id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Academic Semester fetched successfully!',
  });
});

const updateDocument = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const result = await academicSemesterService.updateDocument(id, body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Academic Semester updated successfully!',
  });
});

const deleteById = catchAsync(async (req, res) => {
  const {
    params: { id },
  } = req;
  const result = await academicSemesterService.deleteById(id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Academic Semester deleted successfully!',
  });
});

export const academicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getById,
  updateDocument,
  deleteById,
};
