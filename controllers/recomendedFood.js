const { RecomendedFood } = require("../models/recomendedFood");

async function getAll(req, res, next) {
  try {
    const docs = await RecomendedFood.find().exec();
    return res.json(docs);
  } catch (error) {
    next(error);
  }
}

module.exports = getAll;
