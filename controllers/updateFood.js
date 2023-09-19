const { Food, schemas } = require("../models/food");

const updateFood = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }
  const response = schemas.updateFoodSchema.validate(req.body);
  if (response.error) {
    const errorMessage = response.error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  const { id: foodId } = req.params;
  const food = req.body;

  try {
    const result = await Food.findByIdAndUpdate(foodId, food, {
      new: true,
    }).exec();
    if (!result) {
      return res.status(404).json({ message: "Food not found" });
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFood;

//     const { foodId } = req.params;
//     try {
//     const doc = await Food.findById(foodId).exec();
//     if (doc === null) {
//       return res.status(404).json({ message: "Not found" });
//     }
//     return res.json(doc);
//   } catch (error) {
//     next(error);
//   }
// }
