const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  fetchProductsByUser,
} = require("../controller/productController");
const { verifyToken } = require("../middleware/verifyToken");

productRouter.post("/api/v1/createProduct", [verifyToken], createProduct);
productRouter.get(
  "/api/v1/fetchProductsByUser",
  [verifyToken],
  fetchProductsByUser
);

module.exports = productRouter;
