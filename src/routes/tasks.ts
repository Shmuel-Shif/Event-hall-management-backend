import { Router } from 'express';
import { TaskController } from '../controllers/tasks';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

router.post('/', TaskController.createTask);
router.patch('/:id/status', TaskController.updateTaskStatus);

export default router; 