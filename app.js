const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http); 
const inbox = require('./models/inbox');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
app.get('/',function(req,res){
    res.sendFile(__dirname +'/user/src/index.html');
});

const user = require('./routes/user');
app.use('/users',user);

// database connection
const connection = mongoose.connect("mongodb://bhargav:bhargav@ds143099.mlab.com:43099/chatapp"); 
mongoose.connection.on('connected',()=>{
  console.log('connected to database ');
});
mongoose.connection.on('error', (err) => {
  if (err) {
      console.log('Error' + err);
  }
});

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

http.listen(3000,() =>{
    console.log("server listening to port no:3000");
});