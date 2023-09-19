const { User } = require("../models/user");
const { Weight } = require("../models/weight");
const { ctrlWrapper } = require("../helpers");

const changeGoal = async (req, res) => {
  const { _id } = req.user;
  const { goal } = req.body;

  const user = await User.findByIdAndUpdate(_id, { goal }, { new: true });

  res.json({
    goal: user.goal,
  });
};

const changeWeight = async (req, res) => {
  const { _id: owner } = req.user;
  const currentDate = req.body.date || Date.now();
  const newWeight = req.body.weight;

  const beginDate = new Date(currentDate);
  const endDate = new Date(currentDate);
  beginDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const currentUserAndDay = await Weight.findOne({
    owner,
    date: { $gte: beginDate, $lte: endDate },
  });

  let updatedUserAndDay = null;
  if (!currentUserAndDay) {
    updatedUserAndDay = await Weight.create({
      date: currentDate,
      weight: newWeight,
      owner,
    });
  } else {
    updatedUserAndDay = await Weight.findByIdAndUpdate(
      currentUserAndDay._id,
      { weight: newWeight },
      { new: true }
    );
  }

  res.status(200).json(updatedUserAndDay);
};

module.exports = {
  changeGoal: ctrlWrapper(changeGoal),
  changeWeight: ctrlWrapper(changeWeight),
};
