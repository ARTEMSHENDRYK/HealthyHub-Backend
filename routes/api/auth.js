const express = require("express");
const ctrl = require("../../controllers/auth");
const { schemas } = require("../../models/user");
const { validateBody, authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// router.get('/verify/:verificationToken', ctrl.verifyEmail);

// router.post("/verify", validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/update", authenticate, validateBody(schemas.updateSchema), ctrl.updateUser);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

router.patch("/goal", authenticate, validateBody(schemas.updateGoalSchema), ctrl.updateGoal);

module.exports = router;