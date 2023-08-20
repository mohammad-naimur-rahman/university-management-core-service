import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidation } from './faculty.validations';

const router = express.Router();

router
  .route('/')
  .get(FacultyController.getAllFromDB)
  .post(
    validateRequest(FacultyValidation.create),
    FacultyController.insertIntoDB
  );

router
  .route('/:id')
  .get(FacultyController.getByIdFromDB)
  .patch(
    validateRequest(FacultyValidation.update),
    FacultyController.updateDocument
  )
  .delete(FacultyController.deleteById);

export const facultyRoutes = router;
