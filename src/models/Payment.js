const { model, Schema, mongoose } = require("mongoose");

const paymentSchema = new Schema({
  // Define payment schema here
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  contestName: String,
  contestId: String,
  email: String,
  amount: Number,
  transactionId: String,
  paymentDate: String,
});

const Payment = model("Payment", paymentSchema);

module.exports = Payment;
