const express = require("express");
const productRouter = express.Router();
const { createProduct } = require("../controller/productController");
const { verifyToken } = require("../middleware/verifyToken");

productRouter.post("/api/v1/createProduct",[verifyToken], createProduct);

module.exports = productRouter;
