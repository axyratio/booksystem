// validators/validateBook.js
const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  type: Joi.string().valid('novel', 'textbook', 'magazine').required(),
  category: Joi.string().min(1).required(),
  amount: Joi.number().integer().min(0).required(),
  published_date: Joi.date().iso().required(),
  description: Joi.string().allow('', null),
  cover_image: Joi.string().uri().allow('', null),
  authors: Joi.array().items(
    Joi.object({
      email: Joi.string().email().required(),
      firstname: Joi.string().min(1).required(),
      lastname: Joi.string().min(1).required(),
    })
  ).min(1).required(),
  publishers: Joi.array().items(
    Joi.object({
      email: Joi.string().email().required(),
      pub_name: Joi.string().min(1).required(),
      phone: Joi.string().min(5).required(),
      address: Joi.string().min(5).required(),
    })
  ).min(1).required(),
});

const validateBook = (data) => {
  const { error } = bookSchema.validate(data, { abortEarly: false });
  if (error) {
    return {
      valid: false,
      errors: error.details.map((e) => e.message),
    };
  }
  return { valid: true, errors: [] };
};

module.exports = validateBook;
