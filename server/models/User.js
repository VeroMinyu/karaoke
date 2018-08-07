const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  profilePic: String,
  following: [{ type: Schema.Types.ObjectId, ref: "User" }]
});
userSchema.set("timestamps", true);

const User = mongoose.model("User", userSchema);
module.exports = User;
