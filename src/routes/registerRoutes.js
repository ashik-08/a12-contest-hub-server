const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const Register = require("../models/Register");

router.get("/:id/:email", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.params.email;
    const result = await Register.findOne({
      contestId: id,
      participant_email: email,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

module.exports = router;
