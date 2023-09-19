const { Food, schemas } = require("../models/food");
const { isValidObjectId } = require("mongoose");

const addFood = async (req, res, next) => {
  try {
    const response = schemas.addSchema.validate(req.body);

    if (response.error) {
      return res
        .status(400)
        .json({ message: response.error.details[0].message });
    }

    const {
      date,
      mealType,
      mealName,
      carbohydrate,
      protein,
      fat,
      calories,
      owner,
    } = req.body;

    const newFood = await Food.create({
      ...req.body,
      date,
      mealType,
      mealName,
      carbohydrate,
      protein,
      fat,
      calories,
      owner,
    });

    res.status(201).json({
      food: {
        date: newFood.date,
        mealType: newFood.mealType,
        mealName: newFood.mealName,
        carbohydrate: newFood.carbohydrate,
        protein: newFood.protein,
        fat: newFood.fat,
        calories: newFood.calories,
        owner: isValidObjectId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addFood;
