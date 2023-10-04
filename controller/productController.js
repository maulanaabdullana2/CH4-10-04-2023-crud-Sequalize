const { Product } = require("../models");

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      price,
      stock,
    });

    res.status(200).json({
      status: "sucess",
      data: {
        newProduct,
      },
    });
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
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const product = await Product.update(
      {
        name,
        stock,
        price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    req.status(400).json({
      status: "failed",
      mesagge: err.mesagge,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      mesagge: err.mesagge,
    });
  }
};

const findProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      mesagge: err.mesagge,
    });
  }
};

module.exports = {
  createProduct,
  findProducts,
  updateProduct,
  deleteProduct,
  findProductById,
};
