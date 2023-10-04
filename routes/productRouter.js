const router = require("express").Router();
const Product = require("../controller/productController");

router.post("/", Product.createProduct);
router.get("/", Product.findProducts);
router.patch("/:id", Product.updateProduct);
router.delete("/:id", Product.deleteProduct);

module.exports = router;
