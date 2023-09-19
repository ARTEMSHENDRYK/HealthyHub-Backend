const express = require("express");
const ctrl = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemaWater } = require("../../models/water");

const router = express.Router();

router.post(
  "/water-intake",
  authenticate,
  validateBody(schemaWater.addSchema),
  ctrl.addWater
);

module.exports = router;
