import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router: Router = Router();

router.get('/', verifyToken, ProductController.getAllProducts);
router.get('/:id', verifyToken, ProductController.getProductById);

export default router;
