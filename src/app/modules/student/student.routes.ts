import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { StudentValidation } from './student.validations';

const router = express.Router();

router
  .route('/')
  .get(StudentController.getAllFromDB)
  .post(
    validateRequest(StudentValidation.create),
    StudentController.insertIntoDB
  );

router
  .route('/:id')
  .get(StudentController.getByIdFromDB)
  .patch(
    validateRequest(StudentValidation.update),
    StudentController.updateDocument
  )
  .delete(StudentController.deleteById);

export const studentRoutes = router;
