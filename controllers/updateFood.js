const { Food } = require("../models/food");
const { HttpError } = require("../helpers");

const updateFood = async (req, res, next) => {
  const { id: foodId } = req.params;

  const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {
    new: true,
  }).exec();
  
  if (!updatedFood) {
    throw HttpError(404, "Not found");
  }

  return res.json({
    createdAt: updatedFood.createdAt,
    mealType: updatedFood.mealType,
    mealName: updatedFood.mealName,
    carbohydrate: updatedFood.carbohydrate,
    protein: updatedFood.protein,
    fat: updatedFood.fat,
    calories: updatedFood.calories
  });
};

module.exports = updateFood;