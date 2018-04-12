const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http); 
const socket = require('./routes/socket');     
  
app.get('/',function(req,res){
    // res.sendFile(__dirname +'/user/src/app/home/home.component.html');  
    res.sendFile(__dirname +'/user/src/index.html');
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
    io.to(socket.id).emit('message',{name:"chatRoom",msg:"welcome"+" "+handshake.query.name});
    socket.broadcast.emit('new_user',{msg:handshake.query.name+" "+"joind the chat",client_id:handshake.query.client_id});
    socket.on('disconnect',() => {
      socket.broadcast.emit('new_user',{msg:handshake.query.name+" "+"left the chat"});
    })

    socket.on('message', function(msg){
      io.emit('message', msg);
    });

  });
  // io.use((socket,next) => {
  //   var handshake = socket.handshake;
  //   next();
  //   io.emit('new_user',{user:handshake.query.name+"joind the chat"});
  // })
  

http.listen(3000,() =>{
    console.log("server listening to port no:3000");
});