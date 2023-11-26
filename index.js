const express = require("express");
const app = express();
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5001;

// middleware
app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // connect to the database & access it's collections
    const database = client.db("contest-hub");
    const usersCollection = database.collection("users");

    // add a user to collection
    app.post("/users", async (req, res) => {
      try {
        const user = req.body;
        // query to find all users in the collection
        const query = { email: user.email };
        // check if there already exist an user
        const isExist = await usersCollection.findOne(query);
        if (isExist) {
          return res.send({ message: "Already exists" });
        }
        const result = await usersCollection.insertOne(user);
        res.send(result);
      } catch (error) {
        console.log(error);
        return res.send({ error: true, message: error.message });
      }
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("ContestHub server is running!");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
