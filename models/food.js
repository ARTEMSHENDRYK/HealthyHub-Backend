const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const foodSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    mealType: {
      type: String,
      required: [true, "Meal type is required"],
    },
    mealName: {
      type: String,
      required: [true, "Meal name is required"],
    },
    carbohydrate: {
      type: Number,
      default: 0,
    },
    protein: {
      type: Number,
      default: 0,
    },
    fat: {
      type: Number,
      default: 0,
    },
    calories: {
      type: Number,
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  },
  { versionKey: false, timestamps: true }
)

foodSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  date: Joi.date()
    .required()
    .messages({ "any.required": "missing required date field" }), 
  mealType: Joi.string()
    .required()
    .messages({ "any.required": "missing required mealType field" }),
    mealName: Joi.string()
    .required()
    .messages({ "any.required": "missing required mealName field" }),
});

const schemas = {
    addSchema,
}

const Food = model("food", foodSchema);

module.exports = {
  Food,
  schemas,
}