const { ctrlWrapper } = require("../../helpers");
const addFoodInfo = require("./addFoodInfo");
const updateFoodInfo = require("./updateFoodInfo");
const addWaterInfo = require("./addWaterInfo");

module.exports = {
  addFoodInfo: ctrlWrapper(addFoodInfo),
  updateFoodInfo: ctrlWrapper(updateFoodInfo),
  addWaterInfo: ctrlWrapper(addWaterInfo),
};
