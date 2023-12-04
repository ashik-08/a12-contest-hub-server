const { model, Schema, mongoose } = require("mongoose");

const registerSchema = new Schema({
  // Define register schema here
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  contestId: String,
  contest_name: String,
  contest_image: String,
  contest_deadline: String,
  participant_name: String,
  participant_email: String,
  participant_photo: String,
  prize_money: Number,
  submission_instruction: String,
  fileURL: String,
  status: String,
});

const Register = model("Registration", registerSchema);

module.exports = Register;
