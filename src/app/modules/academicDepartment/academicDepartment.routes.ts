import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();

router
  .route('/')
  .get(AcademicDepartmentController.getAllFromDB)
  .post(
    validateRequest(AcademicDepartmentValidation.create),
    AcademicDepartmentController.insertIntoDB
  );
router
  .route('/:id')
  .get(AcademicDepartmentController.getByIdFromDB)
  .patch(
    validateRequest(AcademicDepartmentValidation.update),
    AcademicDepartmentController.updateDocument
  )
  .delete(AcademicDepartmentController.deleteById);

export const academicDepartmentRoutes = router;
