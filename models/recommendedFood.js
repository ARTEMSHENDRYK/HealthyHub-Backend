const { Schema, model } = require("mongoose");

const recommendedFoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  nutrition: {
    carbohydrates: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
  },
});

const RecommendedFood = model("recommended_food", recommendedFoodSchema);

module.exports = {
  RecommendedFood,
};
