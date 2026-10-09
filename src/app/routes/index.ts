import { Router } from 'express';
import { SpecialtyRoutes } from '../module/specialty/specialty.route';
import { AuthRoutes } from '../module/auth/auth.route';
import { UserRoutes } from '../module/user/user.routes';
import { DoctorRoutes } from '../module/doctor/doctor.routes';

const router = Router();

router.use('/specialties', SpecialtyRoutes);

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/doctors', DoctorRoutes);

export const IndexRoutes = router;
