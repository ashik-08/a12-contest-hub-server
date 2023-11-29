// use verify creator
const verifyCreator = async (req, res, next) => {
  try {
    const email = req.decoded.email;
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    const isCreator = user?.role === "creator";
    if (!isCreator) {
      return res.status(403).send({ message: "Forbidden" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
};

module.exports = verifyCreator;
