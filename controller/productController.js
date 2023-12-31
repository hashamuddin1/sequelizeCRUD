const db = require("../model");

const createProduct = async (req, res) => {
  try {
    const Products = db.products;

    const insertProduct = await Products.create({
      productName: req.body.productName,
      price: req.body.price,
      userId: req.user.id,
    });

    return res.send({
      status: 200,
      message: "Product has been Created Successfully",
      data: insertProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const fetchProductsByUser = async (req, res) => {
  try {
    const User = db.users;
    const Products = db.products;

    const getProducts = await User.findOne({
      where: { id: req.user.id },
      include: [
        {
          model: Products,
        },
      ],
    });

    return res.send({
      status: 200,
      message: "Product has been Fetched By A User Successfully",
      data: getProducts,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createProduct,
  fetchProductsByUser,
};
