const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: String,
  logined: {type:Boolean, required: true, default:false},
  IP: String,
  SolvedChallenges: {type: Object, default: {
  "جمع عددين":false,
  "طرح عددين":false,
  "ضرب عددين":false
  
  }, required: true},
  Points: {type: Number, required: true, default:0}
});

// Model
const User = model("User", userSchema);

module.exports = User;
