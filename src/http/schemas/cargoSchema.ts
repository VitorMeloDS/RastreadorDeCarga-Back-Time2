import Joi from 'joi';

export const cargoValidator = Joi.object({
  nome_porto: Joi.string().required(),
  origem: Joi.string().required(),
  destino: Joi.string().required(),
  status: Joi.string().required(),
  data_entrega: Joi.string().required()
});
