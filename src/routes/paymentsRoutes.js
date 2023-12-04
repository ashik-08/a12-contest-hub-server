const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const verifyToken = require("../middlewares/verifyToken");
const Payment = require("../models/Payment");
const Register = require("../models/Register");

// get registration info by payment
router.get("/:id/:email", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.params.email;
    const result = await Payment.findOne({
      contestId: id,
      email: email,
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// payment intent
router.post("/create-payment-intent", verifyToken, async (req, res) => {
  try {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional
      // because Stripe enables its functionality by default.
      // automatic_payment_methods: {
      //   enabled: true,
      // },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

// post payment information to collection
router.post("/", verifyToken, async (req, res) => {
  try {
    const payment = req.body.payment;
    const register = req.body.register;
    const paymentResult = await Payment.create(payment);
    const registerResult = await Register.create(register);
    res.status(201).send(paymentResult);
  } catch (error) {
    console.log(error);
    return res.send({ error: true, message: error.message });
  }
});

module.exports = router;
