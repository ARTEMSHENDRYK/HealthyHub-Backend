const mongoose = require("mongoose");

const recomendedFoodSchema = new mongoose.Schema({
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

const RecomendedFood = mongoose.model("recommended_food", recomendedFoodSchema);

module.exports = { RecomendedFood };
