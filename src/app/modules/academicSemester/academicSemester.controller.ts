import catchAsync from '../../../shared/catchAsync';
//import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
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
  //const filters = pick(req.query, ['searchTerm', 'code', 'year']);
  const result = await academicSemesterService.getAllFromDB();
  sendResponse(res, {
    data: result,
    statusCode: 200,
    message: 'Academic Semesters fetched successfully!',
  });
});

export const academicSemesterController = {
  insertIntoDB,
  getAllFromDB,
};
