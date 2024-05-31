const { Op } = require("sequelize");
const { Sale, sequelize } = require("../models");
const { param } = require("../routes/salesRoute");

class SalesController {
  static async getAll(req, res, next) {
    try {
      const { search, order, sort } = req.query;
      console.log(req.query, "<<<<<<<<<<<<<<<");
      const option = {
        order: [["createdAt", "DESC"]],
      };

      if (search && search != "null") {
        option.where = {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              type: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        };
      }

      if (
        order &&
        order != "null" &&
        (order == "transactionDate" || order == "name" || order == "sellAmount")
      ) {
        option.order[0][0] = order;
      }
      if (sort && sort != "null" && (sort == "ASC" || sort == "DESC")) {
        option.order[0][1] = sort;
      }
      console.log(option, "<<<<<<<<< option");
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

  static async lowestAndHighest(req, res, next) {
    try {
      const { filter } = req.query;
      console.log(req.query, "<<<");

      let option = {};

      if (filter.type == "max") {
        option = {
          where: {
            sellAmount: {
              [Op.eq]: sequelize.literal(
                `(SELECT MAX("sellAmount") FROM "Sales" WHERE "transactionDate" <= '${filter.to}' and "transactionDate" >= '${filter.from}')`
              ),
            },
            transactionDate: {
              [Op.gte]: filter.from,
              [Op.lte]: filter.to,
            },
          },
          order: [["transactionDate", "DESC"]],
        };
      } else {
        option = {
          where: {
            sellAmount: {
              [Op.eq]: sequelize.literal(
                `(SELECT MIN("sellAmount") FROM "Sales" WHERE "transactionDate" <= '${filter.to}' and "transactionDate" >= '${filter.from}')`
              ),
            },
            transactionDate: {
              [Op.gte]: filter.from,
              [Op.lte]: filter.to,
            },
          },
          order: [["transactionDate", "DESC"]],
        };
      }

      const data = await Sale.findAll(option);

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async getItemNameAndTotal(req, res, next) {
    try {
      const data = await Sale.findAll({
        attributes: [
          "name",
          [sequelize.fn("sum", sequelize.col("sellAmount")), "total"],
        ],
        order: [["total", "DESC"]],
        group: ["name"],
        limit: 5,
      });

      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  }

  static async statisticSaleAmount(req, res, next) {
    try {
      const data = (
        await Sale.findAll({
          attributes: [
            [sequelize.fn("max", sequelize.col("sellAmount")), "max"],
            [sequelize.fn("min", sequelize.col("sellAmount")), "min"],
            [sequelize.fn("avg", sequelize.col("sellAmount")), "avg"],
            [sequelize.fn("sum", sequelize.col("sellAmount")), "total"],
          ],
        })
      )[0];

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SalesController;
