const { Water } = require("../models/water");
const { Food } = require("../models/food");
const { Weight } = require("../models/weight");

async function getStatistics(req, res, next) {
  const { _id: owner } = req.user;
  const water = await Water.find({ owner }, "-_id -owner -updatedAt").exec();
  const weight = await Weight.find({ owner }, "-_id -owner -updatedAt").exec();
  const calories = await Food.find({ owner }, "-_id -owner -updatedAt").exec();

  console.log(water);
  console.log(weight);
  console.log(calories);

  res.json({
    water: water,
    weight: weight,
    calories: calories,
  }
  );
}

module.exports = getStatistics;