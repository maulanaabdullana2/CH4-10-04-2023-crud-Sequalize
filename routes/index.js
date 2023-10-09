const express = require("express");
const router = express.Router();

const Product = require("./productRouter");
const adminProduct = require("./adminProductRouter");

router.use("/api/v1/product", Product);
router.use("/", adminProduct);

module.exports = router;
