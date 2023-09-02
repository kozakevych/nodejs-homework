import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

router.get('/', authMiddleware, ProductController.getAllProducts);
router.get('/:id', authMiddleware, ProductController.getProductById);

export default router;
