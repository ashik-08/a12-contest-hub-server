const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyCreator = require("../middlewares/verifyCreator");
const Contest = require("../models/Contest");

// get all contest data from collection -- checked
router.get("/", async (req, res) => {
  try {
    let filter = {};
    const search = req.query.search;
    if (search) {
      filter.contest_type = { $regex: search, $options: "i" };
    }
    const contests = await Contest.find(filter);
    const popular = await Contest.find({ status: "accepted" })
      .sort({ participation_count: -1 })
      .limit(8);
    res.send({ contests, popular });
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// get contest by email from collection -- checked
router.get("/:email", verifyToken, verifyCreator, async (req, res) => {
  try {
    const query = { created_by_email: req.params.email };
    const result = await Contest.find(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// add contest to collection -- checked
router.post("/", verifyToken, verifyCreator, async (req, res) => {
  try {
    const contest = req.body;
    // query to find if a contest with the same attributes already exists
    const existingContest = await Contest.findOne({
      contest_name: contest.contest_name,
      contest_price: contest.contest_price,
      prize_money: contest.prize_money,
      contest_type: contest.contest_type,
    });
    if (existingContest) {
      return res.send({ message: "Already exists" });
    }
    // Create a new contest
    const result = await Contest.create(contest);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// delete a contest from collection -- checked
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const result = await Contest.deleteOne(query);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

module.exports = router;
