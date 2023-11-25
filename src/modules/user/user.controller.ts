import { Request, Response } from 'express';
import { UserModel } from './user.model';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
   try {
      const user = req.body;

      const { error } = userValidationSchema.validate(user);

      if (error) {
         return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.details,
         });
      }

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
      if (result === null) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
               code: 404,
               description: 'User not found',
            },
         });
      } else {
         return res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
         });
      }
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

      const { error } = userValidationSchema.validate(updatedInfo);

      if (error) {
         return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.details,
         });
      }

      const result = await UserServices.updateSingleUser(
         Number(id),
         updatedInfo,
      );
      if (result === null) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
               code: 404,
               description: 'User not found',
            },
         });
      } else {
         return res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
         });
      }
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
      if (result === null) {
         res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
               code: 404,
               description: 'User not found',
            },
         });
      } else {
         res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
         });
      }
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

      const { error } = userValidationSchema.validate(orderInfo);

      if (error) {
         return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.details,
         });
      }

      const result = await UserServices.createOrder(Number(id), orderInfo);

      if (result === null) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
               code: 404,
               description: 'User not found',
            },
         });
      } else {
         return res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
         });
      }
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
      const id = req.params.userId;
      const result = await UserServices.getAllOrders(Number(id));

      if (result === null) {
         return res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
               code: 404,
               description: 'User not found',
            },
         });
      } else {
         return res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
         });
      }
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
      const id = req.params.userId;
      const result = await UserServices.getTotalPrice(Number(id));

      res.status(200).json({
         success: true,
         message: 'Total price calculated successfully!',
         data: result[0],
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
