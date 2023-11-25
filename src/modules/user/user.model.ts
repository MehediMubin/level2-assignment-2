import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { Address, IUser, Name, Order } from './user.interface';

const fullNameSchema = new Schema<Name>({
   firstName: {
      type: String,
      required: [true, 'First name is required'],
   },
   middleName: {
      type: String,
   },
   lastName: {
      type: String,
      required: [true, 'Last name is required'],
   },
});

const addressSchema = new Schema<Address>({
   street: {
      type: String,
      required: [true, 'Street is required'],
   },
   city: {
      type: String,
      required: [true, 'City is required'],
   },
   country: {
      type: String,
      required: [true, 'Country is required'],
   },
});

const orderSchema = new Schema<Order>({
   productName: {
      type: String,
      required: [true, 'Product name is required'],
   },
   price: {
      type: Number,
      required: [true, 'Price is required'],
   },
   quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
   },
});

const userSchema = new Schema<IUser>({
   userId: {
      type: Number,
      required: [true, 'User ID is required'],
      unique: true,
   },
   username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'Password is required'],
   },
   fullName: {
      type: fullNameSchema,
      required: [true, 'Full name is required'],
   },
   age: {
      type: Number,
      required: [true, 'Age is required'],
   },
   email: {
      type: String,
      required: [true, 'Email is required'],
   },
   isActive: {
      type: Boolean,
      required: [true, 'Active status is required'],
      default: true,
   },
   hobbies: {
      type: [String],
      required: [true, 'Hobbies are required'],
   },
   address: {
      type: addressSchema,
      required: [true, 'Address is required'],
   },
   orders: {
      type: [orderSchema],
   },
});

userSchema.pre<IUser>('save', async function (next) {
   const user = this;
   user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
   );

   next();
});

export const UserModel = model<IUser>('User', userSchema);
