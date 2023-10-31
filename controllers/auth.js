const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password, goal, gender, weight, height, age, activity } = req.body;
  const user = await User.findOne({ email }).exec();

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const bmr =
    gender === "Male"
      ? Math.round(
          (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * activity
        )
      : Math.round(
          (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * activity
      );
  
  let proteinPercentage, fatPercentage;

  switch (goal) {
    case "Lose fat":
      proteinPercentage = 0.25;
      fatPercentage = 0.20;
      break;
    case "Gain muscle":
      proteinPercentage = 0.30;
      fatPercentage = 0.20;
      break;
    case "Maintain":
      proteinPercentage = 0.20;
      fatPercentage = 0.25;
      break;
    default:
      proteinPercentage = 0.25;
      fatPercentage = 0.20;
  }

  const carbohydratePercentage = 1 - (proteinPercentage + fatPercentage);

  const protein = Math.round((proteinPercentage * bmr) / 4);
  const fat = Math.round((fatPercentage * bmr) / 9);
  const carbohydrate = Math.round((carbohydratePercentage * bmr) / 4);  


  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    bmr,
    fat,
    protein,
    carbohydrate,
  });

  res.status(201).json({
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token }).exec();

  res.json({
    token,
    user: {
      name: user.name,
      goal: user.goal,
      gender: user.gender,
      age: user.age,
      height: user.height,
      weight: user.weight,
      activity: user.activity,
      bmr: user.bmr,
      avatarURL: user.avatarURL,
      fat: user.fat,
      protein: user.protein,
      carbohydrate: user.carbohydrate,
    },
  });
};

const getCurrent = async (req, res) => {
  const { name, goal, gender, age, height, weight, activity, bmr, avatarURL, fat, protein, carbohydrate } = req.user;

  res.json({
      name: name,
      goal: goal,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      activity: activity,
      bmr: bmr,
      avatarURL: avatarURL,
      fat: fat,
      protein: protein,
      carbohydrate: carbohydrate,
    // name: name,
    // gender: gender,
    // age: age,
    // height: height,
    // weight: weight,
    // activity: activity,
    // avatarURL: avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" }).exec();

  res.status(204).json("");
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  await Jimp.read(tempUpload)
    .then((resizeTemp) => {
      return resizeTemp.resize(250, 250).write(tempUpload);
    })
    .catch((err) => {
      console.error(err);
    });

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatar", filename);
  await User.findByIdAndUpdate(_id, { avatarURL }).exec();

  res.json({
    avatarURL,
  });
 };

const updateUser = async (req, res) => {
  const { _id: owner } = req.user;

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

  res.status(200).json({
    name: user.name,
    gender: user.gender,
    age: user.age,
    height: user.height,
    weight: user.weight,
    activity: user.activity,
    bmr: bmr,
  });
};

const updateGoal = async (req, res) => {
  const { _id: owner, bmr } = req.user;
  const { goal } = req.body;

  const user = await User.findByIdAndUpdate(owner, { goal }, { new: true }).exec();

  if (!user) {
    throw HttpError(404, "Not found");
  }

  let proteinPercentage, fatPercentage;

  switch (goal) {
    case "Lose fat":
      proteinPercentage = 0.25;
      fatPercentage = 0.20;
      break;
    case "Gain muscle":
      proteinPercentage = 0.30;
      fatPercentage = 0.20;
      break;
    case "Maintain":
      proteinPercentage = 0.20;
      fatPercentage = 0.25;
      break;
    default:
      proteinPercentage = 0.25;
      fatPercentage = 0.20;
  }

  const carbohydratePercentage = 1 - (proteinPercentage + fatPercentage);

  const protein = Math.round((proteinPercentage * bmr) / 4);
  const fat = Math.round((fatPercentage * bmr) / 9);
  const carbohydrate = Math.round((carbohydratePercentage * bmr) / 4);

  await User.findByIdAndUpdate(owner, { fat, protein, carbohydrate }, { new: true }).exec();

  res.json({
    goal: user.goal,
    fat: fat,
    protein: protein,
    carbohydrate: carbohydrate,
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError(400, "Wrong email");
  }

  const { _id: owner } = user;

  const password = Math.random().toString(36).substring(2,15) + "Sh7";

  const hashPassword = await bcrypt.hash(password, 10);
  
  await User.findByIdAndUpdate(owner, { password: hashPassword }, { new: true }).exec();

  const newPassword = {
    to: email,
    subject: "New password",
    text: `Your new password for Healty Hub: ${password}`,
  };

  await sendEmail(newPassword);

  res.json({
    message: "New password sent to your email",
  });
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUser: ctrlWrapper(updateUser),
  updateGoal: ctrlWrapper(updateGoal),
  forgotPassword: ctrlWrapper(forgotPassword),
};