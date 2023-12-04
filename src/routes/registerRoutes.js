const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const Register = require("../models/Register");
const verifyCreator = require("../middlewares/verifyCreator");

// get all registered contest of a participant by email
router.get("/", verifyToken, async (req, res) => {
  try {
    const email = req.query.email;
    const result = await Register.find({
      participant_email: email,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// get all submitted contest by id
router.get("/:id", verifyToken, verifyCreator, async (req, res) => {
  try {
    const query = {
      contestId: req.params.id,
      status: "completed",
    };
    const result = await Register.find(query);
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
