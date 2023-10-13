import { Router } from 'express';
import CartController from '../controllers/cart.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/isAdmin.middleware';

const router: Router = Router();

router.get('/', verifyToken, CartController.getCart);
router.post('/', verifyToken, CartController.createCart);
router.put('/', verifyToken, CartController.updateCart);
router.delete('/', verifyToken, isAdmin, CartController.deleteCart);
router.post('/checkout', verifyToken, CartController.checkoutCart);

export default router;
