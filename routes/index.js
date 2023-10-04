const express = require("express");
const router = express.Router();

const Product = require("./productRouter");

router.use("/api/v1/product", Product);

module.exports = router;
