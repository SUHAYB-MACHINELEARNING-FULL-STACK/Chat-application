const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  Username: {type:String, /*required:true,*/ default:"مستخدم مجهول الهوية"},
  Email: {type: String, required:true},
  Password: {type:String, required:true},
  messageG: {type:String, required:true, default:"None"},
});

// Model
const User = model("User", userSchema);

module.exports = User;
