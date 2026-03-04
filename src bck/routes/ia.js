const express = require("express");
const { consultarIA } = require("../controllers/iaController");

const router = express.Router();

router.post("/consulta", consultarIA);

module.exports = router;
