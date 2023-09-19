const Joi = require("joi");

const changeGoalSchema = Joi.object({
  goal: Joi.string().valid("lose fat", "maintain", "gain muscle").required(),
});

const changeWeightSchema = Joi.object({
  weight: Joi.number().required(),
});

module.exports = {
  changeGoalSchema,
  changeWeightSchema,
};
