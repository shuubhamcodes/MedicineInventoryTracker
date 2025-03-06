import express from 'express';
import {
  createMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine
} from '../controllers/medicineController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/zodValidationMiddleware.js';
import { medicineSchema } from '../validators/medicineSchema.js';

const router = express.Router();

// All routes are protected
router.use(authenticateToken);

router.post('/', validateRequest(medicineSchema), createMedicine);
router.get('/', getMedicines);
router.put('/:id', validateRequest(medicineSchema), updateMedicine);
router.delete('/:id', deleteMedicine);

export default router;