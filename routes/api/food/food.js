const express = require("express");
const ctrl = require("../../../controllers/food");
const { validateBody } = require("../../../middlewares");
const { schemas } = require("../../../models/food");
const { schemaWater } = require("../../../models/water");

const router = express.Router();

router.post("/food-intake", validateBody(schemas.addSchema), ctrl.addFoodInfo);
router.put(
  "/food-intake/:id",
  validateBody(schemas.updateFoodSchema),
  ctrl.updateFoodInfo
);

router.post(
  "/water-intake",
  validateBody(schemaWater.addSchema),
  ctrl.addWaterInfo
);

module.exports = router;
