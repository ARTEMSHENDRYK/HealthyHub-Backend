const express = require("express");
const ctrl = require("../../controllers/requirement");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();


module.exports = router;
