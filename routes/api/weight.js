const express = require("express");
const ctrl = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/weight");

const router = express.Router();

router.post(
  "/weight",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addWeight
);

module.exports = router;