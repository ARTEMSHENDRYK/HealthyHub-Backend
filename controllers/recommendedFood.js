const { RecommendedFood } = require("../models/recommendedFood");

async function getRecommendedFood(req, res, next) {
  const docs = await RecommendedFood.find({}).exec();

  const shuffled = [...docs].sort(() => 0.5 - Math.random());

  res.json(shuffled.slice(0, 10));
}

module.exports = getRecommendedFood;