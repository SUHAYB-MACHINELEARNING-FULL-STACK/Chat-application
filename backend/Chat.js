const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
  Name: {type:String, /*required:true,*/ default:"مستخدم مجهول الهوية"},
  messageG: {type:String, required:true, default:"None"},
});

// Model
const Chat = model("Chat", chatSchema);

module.exports = Chat;
