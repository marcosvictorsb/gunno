import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  company_name: Joi.string().required(),
  company_domain: Joi.string().required(),
});
