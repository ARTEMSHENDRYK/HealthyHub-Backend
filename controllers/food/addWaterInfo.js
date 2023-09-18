const { Water, schemaWater } = require("../../models/water");
const { isValidObjectId } = require("mongoose");

const addWaterInfo = async (req, res, next) => {
  try {
    const response = schemaWater.addSchema.validate(req.body);

    if (response.error) {
      return res
        .status(400)
        .json({ message: response.error.details[0].message });
    }

    const { date, weight, owner } = req.body;

    const newWater = await Water.create({
      ...req.body,
      date,
      weight,
      owner,
    });

    res.status(201).json({
      Water: {
        date: newWater.date,
        weight: newWater.weight,
        owner: isValidObjectId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addWaterInfo;
