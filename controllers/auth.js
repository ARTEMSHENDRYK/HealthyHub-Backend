const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password, gender, weight, height, age, activity } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  // const verificationToken = uuidv4();

  const bmr =
    gender === "Male"
      ? Math.round(
          (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age) * activity
        )
      : Math.round(
          (447.593 + 9.247 * weight + 3.098 * height - 4.33 * age) * activity
        );

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    bmr,
    // verificationToken,
  });

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Verify your email</a>`,
  // };

  // await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
  });
};

// const verifyEmail = async (req, res) => {
//   const { verificationToken } = req.params;
//   const user = await User.findOne({ verificationToken }).exec();

//   if (!user) {
//     throw HttpError(404, "User not found");
//   }

//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verificationToken: null,
//   }).exec();

//   res.json({
//     message: "Verification successful",
//   });
// };

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email }).exec();

//   if (!user) {
//     throw HttpError(400, "missing required field email");
//   }

//   if (user.verify) {
//     throw HttpError(400, "Verification has already been passed");
//   }

//   const verifyEmail = {
//     to: email,
//     subject: "Verify email",
//     html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
//   };

//   await sendEmail(verifyEmail);

//   res.json({
//     message: "Verification email sent",
//   });
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  // if (!user.verify) {
  //   throw HttpError(401, "Email is not verified");
  // }

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
    },
  });
};

const getCurrent = async (req, res) => {
  const { name, gender, age, height, weight, activity, avatarURL } = req.user;

  res.json({
    name: name,
    gender: gender,
    age: age,
    height: height,
    weight: weight,
    activity: activity,
    avatarURL: avatarURL,
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

module.exports = {
  register: ctrlWrapper(register),
  // verifyEmail: ctrlWrapper(verifyEmail),
  // resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateUser: ctrlWrapper(updateUser),
  updateGoal: ctrlWrapper(updateGoal),
};