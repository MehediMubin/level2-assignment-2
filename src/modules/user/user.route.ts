import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/', UserController.createUser);

router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getSingleUser);

router.put('/:userId', UserController.updateSingleUser);

router.delete('/:userId', UserController.deleteSingleUser);

router.put('/:userId/orders', UserController.createOrder);

router.get('/:userId/orders', UserController.getAllOrders);

router.get('/:userId/orders/total-price', UserController.getTotalPrice);

export const userRouter = router;
