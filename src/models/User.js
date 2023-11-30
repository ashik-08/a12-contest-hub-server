const { model, Schema, mongoose } = require("mongoose");

const userSchema = new Schema({
  // Define user schema here
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: String,
  photo: String,
  email: String,
  password: String,
  createdAt: String,
  role: String,
});

const User = model("User", userSchema);

module.exports = User;
