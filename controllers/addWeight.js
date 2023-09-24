const { Weight } = require("../models/weight");
const { User } = require("../models/user"); 
const { HttpError } = require("../helpers");

const addWeight = async (req, res, next) => {
  const { _id: owner } = req.user;

  const currentDate = Date.now();
  const beginDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  beginDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const existWeight = await Weight.findOne({ owner, createdAt: { $gte: beginDate, $lte: endDate } });

  if (existWeight) {
    throw HttpError(409, "Weight exists for today");
  }

  const newWeight = await Weight.create({ ...req.body, owner });

  const user = await User.findByIdAndUpdate(owner, req.body, { new: true }).exec();

  if (!user) {
    throw HttpError(404, "Not found");
  }

  const { gender, weight, height, age, activity } = user;

  const bmr =
    gender === "Male"
      ? Math.round(
        (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * activity
      )
      : Math.round(
        (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * activity
      );

  await User.findByIdAndUpdate(owner, { bmr }, { new: true }).exec();

  res.status(201).json({
    createdAt: newWeight.createdAt,
    weight: newWeight.weight,
    bmr: bmr,
  });
};

module.exports = addWeight;