import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router: Router = Router();

router.get('/profile/cart', authMiddleware, CartController.getCart);
router.post('/profile/cart', authMiddleware, CartController.createCart);
router.put('/profile/cart', authMiddleware, CartController.updateCart);

// router.delete('/profile/cart', CartController.);
// router.post('/profile/cart/checkout', CartController.);

export default router;
