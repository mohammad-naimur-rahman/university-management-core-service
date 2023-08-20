import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();

router
  .route('/')
  .get(AcademicDepartmentController.getAllFromDB)
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(AcademicDepartmentValidation.create),
    AcademicDepartmentController.insertIntoDB
  );
router
  .route('/:id')
  .get(AcademicDepartmentController.getByIdFromDB)
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(AcademicDepartmentValidation.update),
    AcademicDepartmentController.updateDocument
  )
  .delete(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicDepartmentController.deleteById
  );

export const academicDepartmentRoutes = router;
