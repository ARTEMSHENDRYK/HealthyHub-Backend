const express = require("express");
const ctrl = require("../../controllers/requirement");
const requirementSchema = require("../../schemas/requirementSchema");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.put(
  "/goal",
  authenticate,
  validateBody(requirementSchema.changeGoalSchema),
  ctrl.changeGoal
);

router.put(
  "/weight",
  authenticate,
  validateBody(requirementSchema.changeWeightSchema),
  ctrl.changeWeight
);

router.get("/statistics", authenticate, ctrl.statistics);

module.exports = router;
