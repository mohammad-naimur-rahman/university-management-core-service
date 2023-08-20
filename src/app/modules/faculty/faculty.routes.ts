import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validations';

const router = express.Router();

router
  .route('/')
  .get(FacultyController.getAllFromDB)
  .post(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(FacultyValidation.create),
    FacultyController.insertIntoDB
  );

router
  .route('/:id')
  .get(FacultyController.getByIdFromDB)
  .patch(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    validateRequest(FacultyValidation.update),
    FacultyController.updateDocument
  )
  .delete(
    auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
    FacultyController.deleteById
  );

export const facultyRoutes = router;
