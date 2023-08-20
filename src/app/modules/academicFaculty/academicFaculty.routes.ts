import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';

const router = express.Router();

router
  .route('/')
  .get(AcademicFacultyController.getAllFromDB)
  .post(
    validateRequest(AcademicFacultyValidation.create),
    AcademicFacultyController.insertIntoDB
  );

router
  .route('/:id')
  .get(AcademicFacultyController.getByIdFromDB)
  .patch(
    validateRequest(AcademicFacultyValidation.update),
    AcademicFacultyController.updateDocument
  )
  .delete(AcademicFacultyController.deleteById);

export const academicFacultyRoutes = router;
