const { User } = require("../models/user");
// const { Weight } = require("../models/weight");
const { ctrlWrapper } = require("../helpers");

const changeGoal = async (req, res) => {
  const { _id } = req.user;
  const { goal } = req.body;

  const user = await User.findByIdAndUpdate(_id, { goal }, { new: true });

  res.json({
    goal: user.goal,
  });
};

// const changeWeight = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { weight: newWeight, date } = req.body;

//   const currentUser = await Weight.findOne({ owner });
//   if (!currentUser) {
//     HttpError(404, "User not found");
//   }

//   const updatedUser = await Weight.findByIdAndUpdate(
//     currentUser._id,
//     { weight: newWeight, date },
//     { new: true }
//   );
//   if (!updatedUser) {
//     HttpError(404, "User not found");
//   }

//   res.json(updatedUser);
// };

module.exports = {
  changeGoal: ctrlWrapper(changeGoal),
  // changeWeight: ctrlWrapper(changeWeight),
};
