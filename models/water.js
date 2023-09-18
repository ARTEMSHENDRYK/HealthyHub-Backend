const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Owner is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

waterSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  date: Joi.date()
    .required()
    .messages({ "any.required": "missing required date field" }),
  weight: Joi.number()
    .required()
    .messages({ "any.required": "missing required weight field" }),
  owner: Joi.string().required(),
});

const schemaWater = {
    addSchema,
}

const Water = model("water", waterSchema);

module.exports = {
  Water,
  schemaWater,
}