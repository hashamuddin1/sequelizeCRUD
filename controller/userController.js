const db = require("../model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const User = db.users;

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const insertUser = await User.create({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        id: insertUser.id,
        emailAddress: insertUser.emailAddress,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return res.send({
      status: 200,
      message: "User has been Created Successfully",
      data: insertUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

const fetchUser = async (req, res) => {
  try {
    const User = db.users;
    const getUser = await User.findOne({ where: { id: req.user.id } });

    return res.send({
      status: 200,
      message: "User has been Fetched Successfully",
      data: getUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = {
  createUser,
  fetchUser,
};
