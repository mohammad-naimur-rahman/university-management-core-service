import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterController } from './academicSemester.controller';
import { academicSemesterValidatin } from './academicSemester.validations';

const router = Router();

router
  .route('/')
  .get(academicSemesterController.getAllFromDB)
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(academicSemesterValidatin.insertIntoDBValidation),
    academicSemesterController.insertIntoDB
  );

router
  .route('/:id')
  .get(academicSemesterController.getById)
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(academicSemesterValidatin.updateFromDBValidation),
    academicSemesterController.updateDocument
  )
  .delete(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    academicSemesterController.deleteById
  );

export const AcademicSemesterRoutes = router;
