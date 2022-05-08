const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db");
const User = require("./user");
const Chat = require('./chat');
// console.log(Todo);

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("GET / is Working");
});

app.put("/AddMessageToGroup", (req,res)=>{
  Chat.create(
    {Name:req.body.name, messageG:req.body.messageG},
    /*{$push:
      {'messageGs':req.body.name+":"+req.body.messageG}
    },*/(err,NewMessageG)=>{
    if(err) {
      res.status(400).json(err);
    } else {
      /*updateObj.modifiedCount === 1
          ? res.json(`Update Group messages successfully`)
          : res.status(404).json("This account is not found");*/
      console.log('Nice! \n'+req.body.name+":"+req.body.messageG)
    }
  })
})

app.post('/Register', (req,res)=>{
  Saudi.create({Username:req.body.username, Email:req.body.email, Password:req.body.pass}, (err, NewUser)=>{
    if(err) {
      return res.status(405).json({message:'Username/email/password not typed correctly!'})
    } else {
      return res.status(200).json({message: 'Created an account successfully!', ...NewUser[0]})
    }
  })
})

app.put('/Login', (req,res)=>{
  console.log(req.body.email)
  Saudi.find({Email:req.body.email, Password:req.body.pass}, (err, account)=>{
    if(err) {
      return res.status(404).json({message:"This account not registered on our DB!"})
    } else {
      try {
        if(account.length === 0) {
          return res.status(404).json({message:"This account not registered on our DB!"})
        }
      } catch(err) {
        if(account===null) {
          return res.status(404).json({message:"This account not registered on our DB!"}) 
        }
      }
      return res.status(200).json({message:`Login Successfully!`})
    }
    return res.status(200).json({message:`Login Successfully!`})
  })
})

app.put('/printmessages', (req,res)=>{
  console.log('Sent')
  Chat.find({}, (err,messages)=>{
    if(err) {
      console.log(err)
    } else {
    }
    console.log(messages)
    return res.json(messages)
  })
})
