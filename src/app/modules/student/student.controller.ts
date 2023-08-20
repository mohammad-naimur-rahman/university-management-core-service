import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { StudentService } from './student.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await StudentService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await StudentService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await StudentService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student fetched successfully',
    data: result,
  });
});

const updateDocument = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const result = await StudentService.updateDocument(id, body);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Student updated successfully!',
  });
});

const deleteById = catchAsync(async (req, res) => {
  const {
    params: { id },
  } = req;
  const result = await StudentService.deleteById(id);
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully!',
  });
});

export const StudentController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateDocument,
  deleteById,
};
