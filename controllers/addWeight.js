const { Weight } = require("../models/weight");
const { HttpError } = require("../helpers");

const addWeight = async (req, res, next) => {
  const { _id: owner } = req.user;

  const currentDate = Date.now();
  const beginDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  beginDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  // const existWeight = await Weight.findOne({ owner, createdAt: { $gte: beginDate, $lte: endDate } });

  // if (existWeight) {
  //   throw HttpError(409, "Weight exists for today");
  // }

  const newWeight = await Weight.create({ ...req.body, owner });

  res.status(201).json({
    createdAt: newWeight.createdAt,
    weight: newWeight.weight,
  });
};

module.exports = addWeight;