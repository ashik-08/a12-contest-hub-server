// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");

// get all users  -- checked
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    console.error(error);
    return res.send({ error: true, message: error.message });
  }
});

// get user role by email  -- checked
router.get("/role/:email", async (req, res) => {
  try {
    const email = req.params.email;

    // if (email !== req.decoded?.email) {
    //   return res.status(403).send({ message: "Forbidden" });
    // }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    let admin = user.role === "admin";
    let creator = user.role === "creator";
    let participant = user.role === "user";

    res.send({ admin, creator, participant });
  } catch (error) {
    console.error(error);
    return res.send({ error: true, message: error.message });
  }
});

// add a user to collection -- checked
router.post("/", async (req, res) => {
  try {
    const user = req.body;
    // query to find all users in the collection
    const query = { email: user.email };
    // check if there already exist an user
    const isExist = await User.findOne(query);
    if (isExist) {
      return res.send({ message: "Already exists" });
    }
    const result = await User.create(user);
    res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// update a user role  -- checked
router.patch("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    const updatedUser = {
      $set: {
        role: req.body.newRole,
      },
    };
    const result = await User.updateOne(query, updatedUser);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

module.exports = router;
