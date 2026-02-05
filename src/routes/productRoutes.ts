import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

// Protect all product routes
router.use(authenticate);

router.get('/', ProductController.getAll);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
