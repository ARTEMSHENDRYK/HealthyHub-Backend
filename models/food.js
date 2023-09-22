const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");
const mealType = ["Breakfast", "Lunch", "Dinner", "Snack"];

const foodSchema = new Schema(
  {
    // date: {
    //   type: Date,
    //   required: [true, "Date is required"],
    // },
    mealType: {
      type: String,
      required: [true, "Meal type is required"],
      enum: mealType,      
    },
    mealName: {
      type: String,
      required: [true, "Meal name is required"],
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
    },
  },
  { versionKey: false, timestamps: true }
);

foodSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  // date: Joi.date()
  //   .required()
  //   .messages({ "any.required": "missing required date field" }),
  mealType: Joi.string()
    .required()
    .valid(...mealType)
    .messages({ "any.required": "missing required mealType field" }),
  mealName: Joi.string()
    .required()
    .messages({ "any.required": "missing required mealName field" }),
  carbohydrate: Joi.string()
    .required()
    .messages({ "any.required": "missing required carbohydrate field" }),
  protein: Joi.string()
    .required()
    .messages({ "any.required": "missing required protein field" }),
  fat: Joi.string()
    .required()
    .messages({ "any.required": "missing required fat field" }),
  calories: Joi.string()
    .required()
    .messages({ "any.required": "missing required calories field" }),
});

const updateSchema = Joi.object({
  // date: Joi.date()
  //   .required()
  //   .messages({ "any.required": "missing required date field" }),
  mealType: Joi.string()
    .required()
    .valid(...mealType)
    .messages({ "any.required": "missing required mealType field" }),
  mealName: Joi.string()
    .required()
    .messages({ "any.required": "missing required mealName field" }),
  carbohydrate: Joi.string()
    .required()
    .messages({ "any.required": "missing required carbohydrate field" }),
  protein: Joi.string()
    .required()
    .messages({ "any.required": "missing required protein field" }),
  fat: Joi.string()
    .required()
    .messages({ "any.required": "missing required fat field" }),
  calories: Joi.string()
    .required()
    .messages({ "any.required": "missing required calories field" }),
});

const schemas = {
  addSchema,
  updateSchema,
};

const Food = model("food", foodSchema);

module.exports = {
  Food,
  schemas,
};
