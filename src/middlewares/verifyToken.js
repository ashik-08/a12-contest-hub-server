const jwt = require("jsonwebtoken");
require("dotenv").config();

// token middleware function
const verifyToken = async (req, res, next) => {
  try {
    console.log("Value of token in middleware: ", req.headers);
    if (!req.headers.authorization) {
      return res.status(401).send({ auth: false, message: "Not authorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // error
      if (err) {
        console.log(err);
        return res.status(401).send({ message: "Unauthorized" });
      }
      // if token is valid then it would be decoded
      console.log("Value in the token: ", decoded);
      req.decoded = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
};

module.exports = verifyToken;
