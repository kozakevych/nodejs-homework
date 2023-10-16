import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware';
import healthCheckController from '../controllers/healthCheck.controller';

const router: Router = Router();

router.get('/', verifyToken, healthCheckController.dbHealthCheck);

export default router;
