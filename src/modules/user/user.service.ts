import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUser = async (user: IUser): Promise<IUser> => {
   const result = await UserModel.create(user);
   return result;
};

const getAllUsers = async () => {
   const result = await UserModel.find().select(
      'username fullName age email address',
   );
   return result;
};

const getSingleUser = async (id: number) => {
   const result = await UserModel.findOne({ userId: id }).select('-password');
   return result;
};

const updateSingleUser = async (id, updatedInfo) => {
   const result = await UserModel.findOneAndUpdate(
      { userId: id },
      updatedInfo,
      { new: true },
   ).select('-password');
   return result;
};

const deleteSingleUser = async (id: number) => {
   const result = await UserModel.findOneAndDelete({ userId: id });
   return result;
};

const createOrder = async (id, orderInfo) => {
   const result = await UserModel.findOne({ userId: id });
   if (result) {
      const existingOrder = result.orders;
      const newOrder = orderInfo.orders;
      const updatedOrder = [...existingOrder, ...newOrder];

      const updatedResult = await UserModel.findOneAndUpdate(
         { userId: id },
         { orders: updatedOrder },
         { new: true },
      );
      return updatedResult;
   }
   return result;
};

const getAllOrders = async (id: number) => {
   const result = await UserModel.findOne({ userId: id }).select('orders');
   return result;
};

const getTotalPrice = async (id: number) => {
   const result = await UserModel.findOne({ userId: id });
   if (result) {
      const totalPrice = result?.orders.reduce((total, order) => {
         return total + order.price * order.quantity;
      }, 0);

      return { totalPrice };
   }

   return result;
};

export const UserServices = {
   createUser,
   getAllUsers,
   getSingleUser,
   updateSingleUser,
   deleteSingleUser,
   createOrder,
   getAllOrders,
   getTotalPrice,
};
