const { Op } = require("sequelize");
const { Sale } = require("../models");
const { param } = require("../routes/salesRoute");

class SalesController {
  static async getAll(req, res, next) {
    try {
      const { search, order, sort } = req.query;

      const option = {
        order: [["transactionDate", "DESC"]],
      };

      if (search) {
        option.where = {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      if (order == "transaksi") {
        option.order[0][0] = "transactionDate";
      } else if (order == "name") {
        option.order[0][0] = "name";
      }

      if (sort == "desc") {
        option.order[0][1] = "DESC";
      } else {
        option.order[0][1] = "ASC";
      }

      const data = await Sale.findAll(option);
      // send response
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async getOne(req, res, next) {
    try {
      const { id } = req.params;

      const sale = await Sale.findByPk(id);

      if (!sale) {
        throw { name: "Not Found", message: "Sale data not found" };
      }

      res.status(200).json({ data: sale });
    } catch (error) {
      next(error);
    }
  }

  static async add(req, res, next) {
    try {
      const { name, stock, sellAmount, transactionDate, type } = req.body;
      const newSale = await Sale.create({
        name,
        stock,
        sellAmount,
        transactionDate,
        type,
      });

      // send response
      res.status(201).json({ message: "Success add sales", data: newSale });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const salesData = await Sale.findByPk(id);

      // check data to update
      if (!salesData) {
        throw { name: "Not Found", message: "Sale data not found" };
      }

      // update sales data
      const { name, stock, sellAmount, transactionDate, type } = req.body;
      await salesData.update({
        name,
        stock,
        sellAmount,
        transactionDate,
        type,
      });

      // send response
      res
        .status(200)
        .json({ message: "Success update sales", data: salesData });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      // check data to delete
      const saleData = await Sale.findByPk(id);

      if (!saleData) {
        throw { name: "Not Found", message: "Sale data not found" };
      }

      // delete data
      await saleData.destroy();

      // send response
      res.status(200).json({
        message: "Success delete sale data",
        deleteData: saleData,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SalesController;
