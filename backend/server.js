const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./db");
const Todo = require("./todo");
const User = require("./user");
const Saudi=require('./saudi');
const Chat=require('./chat');
// console.log(Todo);

app.use(express.json());
app.use(cors());

// use uuid and array if mongoDB didn't work for you
const arrServer = [
  {
    _id: "61c420a96096f17c23ba1ab7",
    title: "444444444",
    isCompleted: false,
    __v: 0,
  },
  {
    _id: "61c420ac6096f17c23ba1abd",
    title: "5555555555555",
    isCompleted: true,
    __v: 0,
  },
];

app.get("/", (req, res) => {
  res.json("GET / is Working");
});
app.put("/loginedIP", (req,res)=>{
  User.find({IP:req.body.IP}, (err,UData)=>{
    if(err) {
      res.status(400).json(err);
    } else {
      return res.status(200).json(UData[UData.length-1])
    }
  })
})

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
  Saudi.find({Email:req.body.email, Password:req.body.pass}, (err, account)=>{
    if(err) {
      return res.status(404).json({message:"This account not registered on our DB!"})
    } else {
      try {
      return res.status(200).json({message:`Login Successfully!`, ...account[0]})
      } catch(err) {
        return res.status(404).json({message:"This account not registered on our DB!"})
      }
    }
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

app.put("/Convert2Logined", (req,res)=>{
  User.updateOne({email:req.body.email, password:req.body.password}, {logined:true, IP:req.body.IP}, (err,updateObj)=>{
    if(err) {
      res.status(400).json(err);
    } else {
      updateObj.modifiedCount === 1
          ? res.json(`Update Challenge successfully`)
          : res.status(404).json("This account is not found");
    }
    //return res.status(200).json(`o_o`)
  })
})

// CRUD: Create, Read, Update, Delete
app.put("/setPoints",(req,res)=>{
  var vari=0
  User.find({email:req.body.email, password:req.body.password}, (err,Points)=>{
    if(err) {
      console.log(err)
    } else {
      return res.status(200).json(Points[0])
      setTimeout(()=>vari=Points[0].Points,3000)
    }
  })
  setTimeout(()=>{
  console.log('Your Level',req.body.Level)
  console.log('Vari',vari)
  if(req.body.Level==="سهل") {vari+=100} else if(req.body.Level==="متوسط") {vari+=300} else if(req.body.Level==="صعب") {vari+=500}
  console.log('Vari',vari)
  User.updateOne({email:req.body.email, password:req.body.password}, {Points:vari}, (err,Obj)=>{
    if(err) {
      console.log("ADD POINTS", err)
    } else {
      console.log("GOOD!")
    }
  })
},4000)
})
app.put("/AuthSucc", (req,res)=>{
  if(Object.keys(req.body).includes('email')) {
  User.find({email:req.body.email}, (err, arrUser)=>{
     if(err) {
        console.log(err)
     } else {
        console.log(arrUser[0])
    }
    return res.json(arrUser[0])
  })
} else {
  User.find({}, (err,UserDetails)=>{
    if(err) {
      console.log("ERROR!", err)
    } else {
      console.log(UserDetails)
      //return 
        /*Object.keys(UserDetails)
      .sort((a, b) => UserDetails[a] - UserDetails[b])
      .reduce(
        (_sortedObj, key) => ({
          ..._sortedObj,
          [key]: UserDetails[key]
        }),
        {}
    ).slice(0,9)*/
  /*UserDetails=Object.keys(UserDetails)
    .sort((a, b) => UserDetails[a] - UserDetails[b])
    .reduce(
      (_sortedObj, key) => ({
        ..._sortedObj,
        [key]: UserDetails[key]
      }),
      {}
  ).slice(0,9)*/
    return res.json(UserDetails)
    
    }
  })
}
});

app.put("/SolvedChallenge", (req,res)=>{
var k={}
User.find({ email:req.body.email }, (err, arrUser)=>{
     if(err) {
        console.log(err)
     } else {
        console.log(arrUser)
        setTimeout(()=>k=arrUser[0].SolvedChallenges, 2000)
     }
  });
  setTimeout(()=>{
let r=k
console.log(k)
r[req.body.Challenge]=true
console.log(r)
  User.updateOne({IP:req.body.IP, email:req.body.email}, {SolvedChallenges:r}, (err, updateObj)=>{
      if (err) {
        res.status(400).json(err);
      } else {
        updateObj.modifiedCount === 1
          ? res.json(`Update ${req.body.Challenge} Challenge successfully`)
          : res.status(404).json("This account is not found");
      }

  })
},3000)
});
/*app.put('/LeaderBoard', (req,res)=>{
  User.find({}, (err,UsersDetails)=>{
    if(err) {
      console.log(err)
    } else {
      return res.json(UsersDetails)
      console.log('User details')
    }
    return res.json(UsersDetails[0])
  })
})*/
app.put("/AuthSucc2", (req,res)=>{

  User.find({IP:req.body.IP/*email: req.body.email, password: req.body.password, logined:true*/}, (err, arrUser)=>{
     if(err) {
        console.log(err)
     } else {
        console.log(arrUser[arrUser.length-1])
    }
    return res.json(arrUser[arrUser.length-1])
  })

});

app.get("/tasks", (req, res) => {
  // use this if mongoDB didn't work for you
  // res.json(arrServer);

  Todo.find({}, (err, data) => {
    console.log(req.query)
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.json(data);
    }
  });
});

//              ?key=value&key=value
app.get("/filter", (req, res) => {
  console.log(req.query);
  Todo.find({ isCompleted: req.query.isCompleted }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

app.post("/tasks", (req, res) => {
  // console.log('25:',req.body);

  Todo.create(req.body, (err, newTask) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      res.status(201).json(newTask);
    }
  });
});

app.delete("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteOne({ _id: req.params.id }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      deleteObj.deletedCount === 1
        ? res.json("Delete one todo successfully")
        : res.status(404).json("This todo is not found");
    }
  });
});

app.delete("/tasks", (req, res) => {
  // console.log("37:", req.params.id);

  Todo.deleteMany({ isCompleted: true }, (err, deleteObj) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      console.log(deleteObj);
      deleteObj.deletedCount === 0
        ? res.status(404).json("There is no completed todo found")
        : res.json("Delete all completed todos successfully");
    }
  });
});

app.put("/tasks/:id", (req, res) => {
  // console.log("37:", req.params.id);
  Todo.updateOne(
    { _id: req.params.id },
    { title: req.body.newTitle },
    (err, updateObj) => {
      if (err) {
        // console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one todo successfully")
          : res.status(404).json("This todo is not found");
      }
    }
  );
});

app.put("/users/logined", (req, res) => {
  console.log("124:", req.params);
  console.log("email: ",req.body.email)
  console.log("logined", req.body.logined)
  User.updateOne(
    { email: req.body.email, password:req.body.password },
    { logined: req.body.logined , IP: req.body.IP},
    (err, updateObj) => {
      if (err) {
        console.log("ERROR: ", err);
        res.status(400).json(err);
      } else {
        console.log(updateObj);
        updateObj.modifiedCount === 1
          ? res.json("Update one account successfully")
          : res.status(404).json("This account is not found");
      }
    }
  );
  User.find({ email:req.body.email, password:req.body.password }, (err, arrUser)=>{
     if(err) {
        console.log(err)
     } else {
        console.log(arrUser)
     }
  });
  /*User.updateOne({email:req.body.email, password:req.body.password},{IP: req.body.IP},(err, updateObj)=>{
  
     if(err) {
        console.log("ERROR: ", err)
        res.status(400).json(err);
     } else {
    	console.log("updated: ", updateObj)
    	updateObj.modifiedCount === 1
          ? res.json("Update one account with IP successfully")
          : res.status(404).json("This account is not found");
      }
     });*/
  
});

// USER
app.post("/users/register", (req, res) => {
  User.create(req.body, (err, newUser) => {
    if (err) {
      // console.log("ERROR: ", err);
      res.status(400).json({ message: "This email already taken" });
    } else {
      // res.status(201).json(newUser);
      res.status(201).json({ message: "Create New User Successfully" });
    }
  });
});

app.post("/users/login", (req, res) => {
  User.find({ email: req.body.email }, (err, arrUserFound) => {
    if (err) {
      console.log("ERROR: ", err);
    } else {
      // console.log(arrUserFound);
      if (arrUserFound.length === 1) {
        // we found the user
        if (req.body.password === arrUserFound[0].password) {
          // password correct
          res.status(200).json({
            message: "Login Successfully",
            username: arrUserFound[0].username,
            email: arrUserFound[0].email
          });
        } else {
          // password incorrect
          res.status(400).json({
            message: "Wrong Password",
          });
        }
      } else {
        res.status(404).json({
          message: "The email entered is not registered",
        });
      }
    }
    
  });
/*User.updateOne({email:req.body.email, password:req.body.password},{IP: req.body.IP},(err, Obj)=>{
  
     if(err) {
        res.status(400).json(err);
     } else {
    	console.log(Obj)
    	updateObj.modifiedCount === 1
          ? res.json("Update one account with IP successfully")
          : res.status(404).json("This account is not found");
      }
     });*/
  
});


app.listen(7800, () => {
  console.log("SERVER IS WORKING ..");
});

/*
the up endpoint is replace to these two
app.get("/completed", (req, res) => {
  Todo.find({ isCompleted: true }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});

app.get("/not_completed", (req, res) => {
  Todo.find({ isCompleted: false }, (err, data) => {
    if (err) {
      console.log("ERR", err);
    } else {
      // console.log(data);
      res.json(data);
    }
  });
});
*/
