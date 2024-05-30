"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sale.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Product name is require" },
          notEmpty: { msg: "Product name is require" },
        },
      },
      stock: DataTypes.INTEGER,
      sellAmount: DataTypes.INTEGER,
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Transaction date is require" },
          notEmpty: { msg: "Transaction date is require" },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Product type is require" },
          notEmpty: { msg: "Product type is require" },
        },
      },
    },
    {
      sequelize,
      modelName: "Sale",
    }
  );
  return Sale;
};
