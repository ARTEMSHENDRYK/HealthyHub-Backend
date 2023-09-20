const { RecommendedFood } = require("../models/recommendedFood");

async function getAll(req, res, next) {
  const docs = await RecommendedFood.find({}).exec();

  const shuffled = [...docs].sort(() => 0.5 - Math.random());

  console.log(shuffled);

  res.json(shuffled.slice(0, 10));
}

module.exports = getAll;