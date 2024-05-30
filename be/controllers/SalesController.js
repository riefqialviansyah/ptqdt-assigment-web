class SalesController {
  static getAll(req, res) {
    res.send("Get All Sales");
  }

  static add(req, res) {
    res.send("Add Sales");
  }

  static update(req, res) {
    res.send("Update Sales");
  }

  static delete(req, res) {
    res.send("Delete Sales");
  }
}

module.exports = SalesController;
