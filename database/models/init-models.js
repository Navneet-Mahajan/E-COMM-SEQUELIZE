var DataTypes = require("sequelize").DataTypes;
var _Cart = require("./Cart");
var _Products = require("./Products");
var _SequelizeMeta = require("./SequelizeMeta");
var _Users = require("./Users");

function initModels(sequelize) {
  var Cart = _Cart(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Cart.belongsTo(Products, { as: "product", foreignKey: "productId"});
  Products.hasMany(Cart, { as: "Carts", foreignKey: "productId"});
  Cart.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Cart, { as: "Carts", foreignKey: "userId"});
  Products.belongsTo(Users, { as: "createdBy_User", foreignKey: "createdBy"});
  Users.hasMany(Products, { as: "Products", foreignKey: "createdBy"});

  return {
    Cart,
    Products,
    SequelizeMeta,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
