const { ctrlWrapper } = require("../helpers");
const getRecommendedFood = require("./recommendedFood");
const getStatistics = require("./statistics");
const addWater = require("./addWater");
const addWeight = require("./addWeight");
const addFood = require("./addFood");
const updateFood = require("./updateFood");

module.exports = {
  getRecommendedFood: ctrlWrapper(getRecommendedFood),
  getStatistics: ctrlWrapper(getStatistics),
  addWater: ctrlWrapper(addWater),
  addWeight: ctrlWrapper(addWeight),
  addFood: ctrlWrapper(addFood),
  updateFood: ctrlWrapper(updateFood),
};
