import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

/**
 * POST /api/orders/create
 * Create a new order
 */
router.post('/create', createOrder);

export default router;