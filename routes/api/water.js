const express = require("express");
const ctrl = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/water");

const router = express.Router();

router.post(
  "/water-intake",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addWater
);

router.get(
  "/statistics",
  authenticate,
  ctrl.getStatistics
);

module.exports = router;
