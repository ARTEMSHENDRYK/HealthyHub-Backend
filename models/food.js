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
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
    },
    carbohydrate: {
      type: Number,
      default: 0,
      required: [true, "Carbohydrate is required"],
    },
    protein: {
      type: Number,
      default: 0,
      required: [true, "Protein is required"],
    },
    fat: {
      type: Number,
      default: 0,
      required: [true, "Fat is required"],
    },
    calories: {
      type: Number,
      default: 0,
      required: [true, "Calories is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Owner is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

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
  carbohydrate: Joi.string().required(),
  protein: Joi.string().required(),
  fat: Joi.string().required(),
  calories: Joi.string().required(),
  owner: Joi.string().required(),
});

const updateFoodSchema = Joi.object({
  date: Joi.date()
    .required()
    .messages({ "any.required": "missing required date field" }),
  mealType: Joi.string()
    .required()
    .messages({ "any.required": "missing required mealType field" }),
  mealName: Joi.string()
    .required()
    .messages({ "any.required": "missing required mealName field" }),
  carbohydrate: Joi.string().required(),
  protein: Joi.string().required(),
  fat: Joi.string().required(),
  calories: Joi.string().required(),
  owner: Joi.string().required(),
});

const schemas = {
  addSchema,
  updateFoodSchema,
};

const Food = model("food", foodSchema);

module.exports = {
  Food,
  schemas,
};
