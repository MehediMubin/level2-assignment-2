import Joi from 'joi';

const nameValidationSchema = Joi.object({
   firstName: Joi.string(),
   middleName: Joi.string(),
   lastName: Joi.string(),
});

const addressValidationSchema = Joi.object({
   street: Joi.string(),
   city: Joi.string(),
   country: Joi.string(),
});

const orderValidationSchema = Joi.object({
   productName: Joi.string(),
   price: Joi.number().positive(),
   quantity: Joi.number().integer().min(1),
});

const userValidationSchema = Joi.object({
   userId: Joi.number().integer().positive(),
   username: Joi.string().max(20),
   password: Joi.string(),
   fullName: nameValidationSchema,
   age: Joi.number().integer().min(1),
   email: Joi.string().email(),
   isActive: Joi.boolean().default(true),
   hobbies: Joi.array().items(Joi.string()),
   address: addressValidationSchema,
   orders: Joi.array().items(orderValidationSchema),
});

export default userValidationSchema;
