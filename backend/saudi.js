const { Schema, model } = require("mongoose");

const saudiSchema = new Schema({
  Username: {type:String, /*required:true,*/ default:"مستخدم مجهول الهوية"},
  Email: {type: String, required:true},
  Password: {type:String, required:true},
  messageG: {type:String, required:true, default:"None"},
  /*messageGs: {type:Object, required:true, default:[
      /*"Admin Of This Chat Website":*//*"Hi, I hope you're send messages carefully without mistakes/problems!, Thank you so much!"
  ]}*/
  /*email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: String,
  logined: {type:Boolean, required: true, default:false},
  IP: String,
  SolvedChallenges: {type: Object, default: {
  "جمع عددين":false,
  "طرح عددين":false,
  "ضرب عددين":false
  
  }, required: true},
  Points: {type: Number, required: true, default:0}*/
});

// Model
const Saudi = model("Saudi", saudiSchema);

module.exports = Saudi;
