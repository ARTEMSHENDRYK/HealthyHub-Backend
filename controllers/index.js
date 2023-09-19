const { ctrlWrapper } = require("../helpers");
const addFood = require("./addFood");
const updateFood = require("./updateFood");
const addWater = require("./addWater");
const getAll = require("./recomendedFood");

module.exports = {
  addFood: ctrlWrapper(addFood),
  updateFood: ctrlWrapper(updateFood),
  addWater: ctrlWrapper(addWater),
  getAll: ctrlWrapper(getAll),
};
