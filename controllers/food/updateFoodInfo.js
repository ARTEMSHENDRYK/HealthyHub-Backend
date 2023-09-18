const { Food } = require("../../models/food");
// const { User } = require("../models/user");

const updateFoodInfo = async (req, res, next) => {


    const { foodId } = req.params;
    try {
    const doc = await Food.findById(foodId).exec();
    if (doc === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(doc);
  } catch (error) {
    next(error);
  }
}





//   if (Object.keys(req.body).length === 0) {
//     return res.status(400).json({ message: "missing fields" });
//   }
//   const response = schemas.addSchema.validate(req.body);
//   if (response.error) {
//     const errorMessage = response.error.details[0].message;
//     return res.status(400).json({ message: errorMessage });
//   }

//   const { _id } = req.params;

//   const food = {
//     mealType: req.body.mealType,
//     mealName: req.body.mealName,
//     carbohydrate: req.body.carbohydrate,
//     protein: req.body.protein,
//     fat: req.body.fat,
//     calories: req.body.calories,
//   };

//   try {
//     const result = await Food.findByIdAndUpdate(_id, food, {
//       new: true,
//     }).exec();
//     if (result === null) {
//       return res.status(404).json({ message: "Food not found" });
//     }
//     return res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = updateFoodInfo;