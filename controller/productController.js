const imagekit = require("../lib/imagekit");
const ApiError = require("../utils/apiError");
const { Product } = require("../models");

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const file = req.file;

  const split = file.originalname.split(".");
  const extension = split[split.length - 1];

  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now}.${extension}`,
  });

  try {
    const newProduct = await Product.create({
      name,
      price,
      stock,
      imageURL: img.url,
    });

    res.status(200).json({
      status: "sucess",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    next(new ApiError(error.mesagge, 400));
  }
};

const findProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      status: "success",
      data: {
        products,
      },
    });
  } catch (error) {
    next(new ApiError(error.mesagge, 400));
  }
};

const updateProduct = async (req, res, next) => {
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
    next(new ApiError(error.mesagge, 400));
  }
};

const deleteProduct = async (req, res, next) => {
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
    next(new ApiError(error.mesagge, 400));
  }
};

const findProductById = async (req, res, next) => {
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
    next(new ApiError(error.mesagge, 400));
  }
};

module.exports = {
  createProduct,
  findProducts,
  updateProduct,
  deleteProduct,
  findProductById,
};
