const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const Register = require("../models/Register");

// get all registered contest of a participant by email
router.get("/:email", verifyToken, async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Register.find({
      participant_email: email,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// update contest status and submission file
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const updateData = {
      $set: {
        status: req.body.status,
        fileURL: req.body.fileURL,
      },
    };
    const result = await Register.updateOne(filter, updateData);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

module.exports = router;
