import { Router } from 'express';
import { AttendanceController } from '../controllers/attendance';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/check-in', AttendanceController.recordAttendance);

export default router; 