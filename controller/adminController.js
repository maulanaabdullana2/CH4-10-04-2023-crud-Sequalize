const { Product } = require("../models");
const imagekit = require("../lib/imagekit");

const createPage = async (req, res) => {
  res.render("create.ejs");
};

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const file = req.file;

  const split = file.originalname.split(".");
  const extension = split[split.length - 1];

  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now}.${extension}`,
  });

  try {
    await Product.create({
      name,
      price,
      stock,
      imageURL: img.url,
    });

    res.redirect("/dashboard/admin");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
const findProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.render("index.ejs", {
      products,
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

module.exports = {
  createPage,
  createProduct,
  findProducts,
};
