const router = require("express").Router();
const Product = require("../controller/productController");

router.post("/", Product.createProduct);

module.exports = router;
