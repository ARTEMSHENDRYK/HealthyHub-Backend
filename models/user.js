const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,16}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: false,
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      // match: passwordRegexp,
      required: [true, "Set password for user"],
    },
    goal: {
      type: String,
      enum: ["Lose fat", "Maintain", "Gain muscle"],
      required: [true, "Goal is required"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Gender is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },
    activity: {
      type: Number,
      enum: [1.2, 1.375, 1.55, 1.725, 1.9],
      required: [true, "Activity is required"],
    },
    bmr: {
      type: Number,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: String,
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .pattern(passwordRegexp)
    .required()
    .messages({ "any.required": "missing required password field" }),
  goal: Joi.string()
    .required()
    .messages({ "any.required": "missing required goal field" }),
  gender: Joi.string()
    .required()
    .messages({ "any.required": "missing required gender field" }),
  age: Joi.number()
    .required()
    .messages({ "any.required": "missing required age field" }),
  height: Joi.number()
    .required()
    .messages({ "any.required": "missing required height field" }),
  weight: Joi.number()
    .required()
    .messages({ "any.required": "missing required weight field" }),
  activity: Joi.number()
    .required()
    .messages({ "any.required": "missing required activity field" }),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .required()
    .messages({ "any.required": "missing required password field" }),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  gender: Joi.string(),
  age: Joi.number(),
  height: Joi.number(),
  weight: Joi.number(),
  activity: Joi.number(),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
  updateSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
