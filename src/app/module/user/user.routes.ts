import { Router } from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { createAdminZodSchema, createDoctorZodSchema } from './user.validation';
import { Role } from '../../../generated/prisma/browser';
import { checkAuth } from '../../middleware/checkAuth';

const router = Router();

router.post(
  '/create-doctor',
  validateRequest(createDoctorZodSchema),
  UserController.createDoctor,
);

router.post(
  '/create-admin',
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  validateRequest(createAdminZodSchema),
  UserController.createAdmin,
);

export const UserRoutes = router;
