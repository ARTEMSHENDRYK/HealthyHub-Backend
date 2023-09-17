const Joi = require("joi");

const changeGoalSchema = Joi.object({
  goal: Joi.string().valid("lose fat", "maintain", "gain muscle").required(),
});

module.exports = {
  changeGoalSchema,
};
