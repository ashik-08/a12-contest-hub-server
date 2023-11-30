const User = require("../models/User");

// use verify admin after verifyToken
const verifyAdmin = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await User.findOne(query);
    const isAdmin = user?.role === "admin";
    if (!isAdmin) {
      return res.status(403).send({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
};

module.exports = verifyAdmin;
