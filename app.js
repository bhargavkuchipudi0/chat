const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http); 
const socket = require('./routes/socket'); 
const inbox = require('./models/inbox');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
app.get('/',function(req,res){
    res.sendFile(__dirname +'/user/src/index.html');
});
const connection = mongoose.connect("mongodb://bhargav:bhargav@ds143099.mlab.com:43099/chatapp"); 

mongoose.connection.on('connected',()=>{
  console.log('connected to database ');
});

mongoose.connection.on('error', (err) => {
  if (err) {
      console.log('Error' + err);
  }
});


app.post('/registerUser',(req,res,next) => {

  inbox.find({email:req.body.email},(err,user) => {
    if(user.length > 0){
      res.json({success:true,msg:user[0]});
    }else{
      var user = new inbox({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
      });
      user.save((err,user) => {
        if(user)  console.log(user), res.json({success:true,msg:user});
        else res.json({success:false,msg:err});
      });
    }
  });
});

app.get('/getAllUsers',(req,res) => {
  inbox.find((err,users) => {
    if(users) res.json({success:true,msg:users});
    else res.json({success:false,msg:err});
  })
})
// when connected
// io.on('connection', function(socket){
//     socket.on('new_user',(msg)=>{
//       console.log("new user connected");
//     })

//     socket.on('disconnect',() => {
//         console.log("user disconnected");
//     });
//   });
// //   receiving the message
//   io.on('connection', function(socket){
//     socket.on('message', function(msg){
//       // console.log('message: ' + msg);
//     });
//   }); 
  // sending msg to every one
  io.on('connection', function(socket){
  
    var handshake = socket.handshake;
    inbox.findOneAndUpdate({email:handshake.query.email},{$set:{socket_id:socket.id}}).exec((err,user) => {
    });
    io.to(socket.id).emit('message',{name:"chatRoom",msg:"welcome"+" "+handshake.query.email});
    socket.broadcast.emit('new_user',{msg:handshake.query.email+" "+"joind the chat",client_id:socket.id});
    socket.on('disconnect',() => {
      socket.broadcast.emit('new_user',{msg:handshake.query.email+" "+"left the chat"});
    })

    socket.on('message', function(msg){
      io.emit('message', msg);
    });

    socket.on('private',function(obj){
      console.log(obj.socket_id);
      io.to(obj.socket_id).emit('message',{name:obj.name,msg:"hello private"});
    })

  });
  // io.use((socket,next) => {
  //   var handshake = socket.handshake;
  //   next();
  //   io.emit('new_user',{user:handshake.query.name+"joind the chat"});
  // })
  

http.listen(3000,() =>{
    console.log("server listening to port no:3000");
});