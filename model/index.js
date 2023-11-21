const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.LOCAL_DATABASE, {
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user")(sequelize, DataTypes);
db.products = require("./product")(sequelize, DataTypes);

db.users.hasOne(db.products, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.products.belongsTo(db.users, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database Re-sync Successfully");
});

module.exports = db;
