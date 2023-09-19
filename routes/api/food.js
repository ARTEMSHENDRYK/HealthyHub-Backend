const express = require("express");
const ctrl = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/food");
const { schemaWater } = require("../../models/water");

const router = express.Router();

router.post(
  "/food-intake",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addFoodInfo
);
router.put(
  "/food-intake/:id",
  authenticate,
  validateBody(schemas.updateFoodSchema),
  ctrl.updateFoodInfo
);
router.get(
  "/recommended-food",
  ctrl.getAll
);

router.post(
  "/water-intake",
  authenticate,
  validateBody(schemaWater.addSchema),
  ctrl.addWaterInfo
);

module.exports = router;
