const { ctrlWrapper } = require("../helpers");
const getAll = require("./recommendedFood");
const addWater = require("./addWater");
const addFood = require("./addFood");
const updateFood = require("./updateFood");

module.exports = {
  getAll: ctrlWrapper(getAll),
  addWater: ctrlWrapper(addWater),
  addFood: ctrlWrapper(addFood),
  updateFood: ctrlWrapper(updateFood),
};
