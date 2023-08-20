import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validations';

const router = express.Router();

router
  .route('/')
  .get(AcademicFacultyController.getAllFromDB)
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(AcademicFacultyValidation.create),
    AcademicFacultyController.insertIntoDB
  );

router
  .route('/:id')
  .get(AcademicFacultyController.getByIdFromDB)
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(AcademicFacultyValidation.update),
    AcademicFacultyController.updateDocument
  )
  .delete(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    AcademicFacultyController.deleteById
  );

export const academicFacultyRoutes = router;
