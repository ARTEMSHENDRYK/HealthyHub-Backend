const { RecommendedFood } = require("../models/recommendedFood");

async function getAll(req, res, next) {
  const docs = await RecommendedFood.find({}).exec();
  console.log(docs);
  console.log(req.params);
  return res.json(docs);
}

module.exports = getAll;