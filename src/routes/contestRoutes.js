const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyCreator = require("../middlewares/verifyCreator");
const verifyAdmin = require("../middlewares/verifyAdmin");
const Contest = require("../models/Contest");

// get single contest info to update contest from Update Contest -- checked
router.get("/:id", async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const result = await Contest.findOne(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// update contest data to db from Update Contest -- checked
router.patch("/:id", verifyToken, verifyCreator, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const updateQuery = {
      $set: {
        contest_name: req.body.contest_name,
        contest_image: req.body.contest_image,
        description: req.body.description,
        contest_price: req.body.contest_price,
        prize_money: req.body.prize_money,
        submission_instruction: req.body.submission_instruction,
        contest_type: req.body.contest_type,
        contest_deadline: req.body.contest_deadline,
      },
    };
    const result = await Contest.updateOne(filter, updateQuery);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// update contest status to db from Manage Contest  -- checked
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const updateQuery = {
      $set: {
        status: "accepted",
      },
    };
    const result = await Contest.updateOne(filter, updateQuery);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

module.exports = router;
