const express = require("express");
const ctrl = require("../../controllers");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/food");

const router = express.Router();

router.post(
  "/food-intake",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addFood
);

router.put(
  "/food-intake/:id",
  authenticate,
  validateBody(schemas.updateSchema),
  ctrl.updateFood
);

router.get("/recommended-food", 
authenticate, ctrl.getRecommendedFood);

module.exports = router;
