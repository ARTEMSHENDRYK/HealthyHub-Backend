const { Food } = require("../models/food");

const addFood = async (req, res, next) => {
  const { _id: owner } = req.user;

  const newFood = await Food.create({ ...req.body, owner });

  res.status(201).json({
    createdAt: newFood.createdAt,
    mealType: newFood.mealType,
    mealName: newFood.mealName,
    carbohydrate: newFood.carbohydrate,
    protein: newFood.protein,
    fat: newFood.fat,
    calories: newFood.calories,
  });
};

module.exports = addFood;
