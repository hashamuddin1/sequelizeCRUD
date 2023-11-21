const express = require("express");
const app = express();
require("dotenv").config();
require("./model/index");
const port = process.env.PORT;
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use([userRouter, productRouter]);

app.listen(port, () => {
  console.log(`App is Listening at port ${port}`);
});
