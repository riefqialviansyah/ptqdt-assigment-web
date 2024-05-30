const errHandler = (err, req, res, next) => {
  switch ("key") {
    case "value":
      break;

    default:
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
      break;
  }
};

module.exports = errHandler;
