const { ctrlWrapper } = require("../helpers");
const addFoodInfo = require("./addFood");
const updateFoodInfo = require("./updateFood");
const addWaterInfo = require("./addWater");
const getAll = require("./recommendedFood");

module.exports = {
  addFoodInfo: ctrlWrapper(addFoodInfo),
  updateFoodInfo: ctrlWrapper(updateFoodInfo),
  addWaterInfo: ctrlWrapper(addWaterInfo),
  getAll: ctrlWrapper(getAll),
};
