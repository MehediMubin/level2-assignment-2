import { Request, Response } from 'express';
import { UserModel } from './user.model';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
   try {
      const user = req.body;
      const result = await UserServices.createUser(user);

      const createdUser = await UserModel.findOne({
         userId: result.userId,
      }).select('-password');

      res.status(201).json({
         success: true,
         message: 'User created successfully',
         data: createdUser,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

const getAllUsers = async (req: Request, res: Response) => {
   try {
      const result = await UserServices.getAllUsers();
      res.status(200).json({
         success: true,
         message: 'Users fetched successfully!',
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

const getSingleUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const result = await UserServices.getSingleUser(Number(id));
      res.status(200).json({
         success: true,
         message: 'User fetched successfully!',
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

const updateSingleUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const updatedInfo = req.body;
      const result = await UserServices.updateSingleUser(
         Number(id),
         updatedInfo,
      );
      res.status(200).json({
         success: true,
         message: 'User updated successfully!',
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

const deleteSingleUser = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const result = await UserServices.deleteSingleUser(Number(id));
      res.status(200).json({
         success: true,
         message: 'User deleted successfully!',
         data: null,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

const createOrder = async (req: Request, res: Response) => {
   try {
      const id = req.params.userId;
      const orderInfo = req.body;
      const result = await UserServices.createOrder(Number(id), orderInfo);
      res.status(200).json({
         success: true,
         message: 'Order created successfully!',
         data: null,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

const getAllOrders = async (req: Request, res: Response) => {
   try {
      const result = await UserServices.getAllOrders();
      res.status(200).json({
         success: true,
         message: 'Orders fetched successfully!',
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

const getTotalPrice = async (req: Request, res: Response) => {
   try {
      const result = await UserServices.getTotalPrice();
      res.status(200).json({
         success: true,
         message: 'Total price calculated successfully!',
         data: result,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: 'Something went wrong',
         error: error,
      });
   }
};

export const UserController = {
   createUser,
   getAllUsers,
   getSingleUser,
   updateSingleUser,
   deleteSingleUser,
   createOrder,
   getAllOrders,
   getTotalPrice,
};
