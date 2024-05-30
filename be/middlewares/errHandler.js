const errHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(403).json({ message: err.errors[0].message });
      break;

    case "Not Found":
      res.status(404).json({ message: err.message });
      break;

    default:
      console.log(err);
      console.log(err.name, "<<<<<<<<<<<<< error name");
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errHandler;
