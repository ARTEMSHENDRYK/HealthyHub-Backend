const { Water } = require("../models/water");

const addWater = async (req, res, next) => {
  const { _id: owner } = req.user;
  
  const newWater = await Water.create({ ...req.body, owner });
  
  res.status(201).json({
    createdAt: newWater.createdAt,
    water: newWater.water,
  });
};

module.exports = addWater;