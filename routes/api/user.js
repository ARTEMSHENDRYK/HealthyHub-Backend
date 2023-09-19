const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/requirement");
const requirementSchema = require("../../schemas/requirementSchema");
const { validateBody, authenticate } = require("../../middlewares");

router.put(
  "/goal",
  authenticate,
  validateBody(requirementSchema.changeGoalSchema),
  ctrl.changeGoal
);

// router.put(
//   "/weight",
//   authenticate,
//   validateBody(requirementSchema.changeWeightSchema),
//   ctrl.changeWeight
// );

module.exports = router;
