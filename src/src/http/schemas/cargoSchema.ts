import Joi from 'joi';

export const cargoValidator = Joi.object({
  origem: Joi.string().required(),
  destino: Joi.string().required(),
  data_entrega: Joi.string().required()
});
