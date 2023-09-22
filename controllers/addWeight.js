const { Weight } = require("../models/weight");

const addWeight = async (req, res, next) => {
  const { _id: owner } = req.user;
  
  const newWeight = await Weight.create({ ...req.body, owner });
  
  res.status(201).json({
    createdAt: newWeight.createdAt,
    water: newWeight.weight,
  });
};

module.exports = addWeight;