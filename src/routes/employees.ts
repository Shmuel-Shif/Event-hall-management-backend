import { Router } from 'express';
import { EmployeeController } from '../controllers/employees';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware); // כל הראוטים דורשים אותנטיקציה

router.post('/', EmployeeController.createEmployee);
router.get('/:id', EmployeeController.getEmployee);

export default router; 