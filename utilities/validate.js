// validation.js
//Jonah Samuel
// this file is used for validation
const Joi = require('joi');

const signupSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'First name cannot be empty.',
    'string.empty': 'First name cannot be empty.',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'Last name cannot be empty.',
    'string.empty': 'Last name cannot be empty.',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email cannot be empty.',
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Invalid email format.',
  }),
  password: Joi.string().required().min(8).messages({
    'any.required': 'Password cannot be empty.',
    'string.empty': 'Password cannot be empty.',
    'string.min': 'Password must be at least 8 characters long.',
  }),
});



const updateUserSchema = Joi.object({
  firstName: Joi.string().messages({
    'string.empty': 'First name cannot be empty.',
  }),
  lastName: Joi.string().messages({
    'string.empty': 'Last name cannot be empty.',
  }),
  email: Joi.string().email().messages({
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Invalid email format.',
  }),
});

//service validation
const serviceSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Service name cannot be empty.',
    'string.empty': 'Service name cannot be empty.',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description cannot be empty.',
    'string.empty': 'Description cannot be empty.',
  }),
  price: Joi.number().required().precision(2).messages({
    'any.required': 'Price cannot be empty.',
    'number.base': 'Price must be a valid number.'
  }),
});

// feedback validation
const feedbackSchema = Joi.object({
  content: Joi.string().required().messages({
    'any.required': 'Content cannot be empty.',
    'string.empty': 'Content cannot be empty.',
  }),
  UserUserId: Joi.number().required().messages({
    'any.required': 'User ID cannot be empty.',
    'number.base': 'User ID must be a valid number.',
  }),
});


//blog validation

const blogSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title cannot be empty.',
    'string.empty': 'Title cannot be empty.',
  }),
  content: Joi.string().required().messages({
    'any.required': 'Content cannot be empty.',
    'string.empty': 'Content cannot be empty.',
  }),
  image: Joi.string().optional(),
});


module.exports = {
  signupSchema,
  updateUserSchema,
  serviceSchema,
  feedbackSchema,
  blogSchema
};
