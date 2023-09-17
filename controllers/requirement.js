const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const changeGoal = async (req, res) => {
  const { _id } = req.user;
  const { goal } = req.body;

  const user = await User.findByIdAndUpdate(_id, { goal }, { new: true });

  res.json({
    goal: user.goal,
  });
};

module.exports = {
  changeGoal: ctrlWrapper(changeGoal),
};
