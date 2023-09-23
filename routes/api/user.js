const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();


router.get("/statistics", authenticate, ctrl.statistics);

module.exports = router;
