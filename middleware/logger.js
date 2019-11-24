
const moment = require("moment");

const logger = (req, res, next) => {
    console.log(
      `Requested : ${req.protocol}://${req.get("host")}${
        req.originalUrl
      } : ${moment().format()}, req : ${req}`
    );
    next();
  };

  module.exports = logger;