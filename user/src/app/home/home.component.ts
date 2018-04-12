import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
declare var $:any;
 
@Component({
  selector: 'app-root', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  socket: SocketIOClient.Socket;
  msg:string;
  name:string;
  email:string;
  id:string="12345678";
  constructor() { 
    let user = localStorage.getItem('user');
    let u = JSON.parse(user);
    this.name = u.name;
    this.email = u.email;
    this.socket = io.connect("http://localhost:3000",{query:{name:this.name,client_id:this.id}});

  }
  
  ngOnInit() {
      
    this.socket.on('message', function(msg){
      $('#messages').append($('<li style="border:1px solid black;height:20px;padding:8px;transform:translate(-10%,0);font-size:120%;border-radius:10px;background-color:white";></li><br>').text(msg.name+":"+msg.msg));
      // alert(msg);
    });

    this.socket.on('new_user',(msg) => {
      $('#con-user-li').append($('<li style="border:1px solid black;height:30px;background-color:#81F7D8;width:200px;border-radius:10px;text-align:center;padding:5px;font-size:20px;cursor:pointer;"><a></a></li><br>').text(msg.msg)).click(function(){alert(msg.client_id);});
      // alert("newuser");
    })

  }
      submit(){
        
        let user = localStorage.getItem('user');
        let u = JSON.parse(user);
        this.name = u.name;
        this.socket.emit('message', {name:this.name,msg:this.msg});       
        return this.msg = '';
        // return $('#msg').text('');
       
      }
     
}
