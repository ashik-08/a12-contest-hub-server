const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectDB = require("./src/db/connectDB");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userRoutes = require("./src/routes/userRoutes");
const contestsRoutes = require("./src/routes/contestsRoutes");
const contestRoutes = require("./src/routes/contestRoutes");
const port = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

// connect to db
connectDB();

// jwt auth related api
app.post("/jwt", async (req, res) => {
  try {
    const user = req.body;
    console.log("from /jwt -- user:", user);
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2h",
    });
    console.log("from /jwt -- token:", token);
    res.send({ token });
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// user related routes
app.use("/users", userRoutes);

// contests related routes
app.use("/contests", contestsRoutes);

// contest related routes
app.use("/contest", contestRoutes);

app.get("/", (req, res) => {
  res.send("ContestHub server is running!");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
