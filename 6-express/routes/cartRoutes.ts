import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

router.get('/', authMiddleware, CartController.getCart);
router.post('/', authMiddleware, CartController.createCart);
router.put('/', authMiddleware, CartController.updateCart);

// router.delete('/profile/cart', CartController.);
// router.post('/profile/cart/checkout', CartController.);

export default router;
