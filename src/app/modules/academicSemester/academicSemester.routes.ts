import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidatin } from './academicSemester.validation';

const router = Router();

router
  .route('/')
  .get(academicSemesterController.getAllFromDB)
  .post(
    validateRequest(academicSemesterValidatin.insertIntoDBValidation),
    academicSemesterController.insertIntoDB
  );

router
  .route('/:id')
  .get(academicSemesterController.getById)
  .patch(
    validateRequest(academicSemesterValidatin.updateFromDBValidation),
    academicSemesterController.updateDocument
  )
  .delete(academicSemesterController.deleteById);

export const AcademicSemesterRoutes = router;
