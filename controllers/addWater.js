const { Water } = require("../models/water");

const addWater = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { water } = req.body;

  const currentDate = Date.now();
  const beginDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  beginDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const existWater = await Water.findOne({
    owner,
    createdAt: { $gte: beginDate, $lte: endDate },
  }).exec();

  if (existWater) {
    const { _id: id, water: addWater } = existWater;

    const updateWater = await Water.findByIdAndUpdate(
      id,
      { water: water + addWater },
      { new: true }
    ).exec();

    res.status(200).json({
      createdAt: updateWater.updatedAt,
      water: updateWater.water,
    });
  } else {
    const newWater = await Water.create({ water, owner });

    res.status(201).json({
      createdAt: newWater.createdAt,
      water: newWater.water,
    });
  }
};

module.exports = addWater;