const { model, Schema, mongoose } = require("mongoose");

const contestSchema = new Schema({
  // Define contest schema here
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  contest_name: String,
  contest_image: String,
  participation_count: Number,
  description: String,
  contest_price: Number,
  prize_money: Number,
  submission_instruction: String,
  contest_type: String,
  created_by_name: String,
  created_by_email: String,
  created_by_photo: String,
  contest_deadline: String,
  status: String,
  winner_name: String,
  winner_email: String,
  winner_photo: String,
});

const Contest = model("Contest", contestSchema);

module.exports = Contest;
