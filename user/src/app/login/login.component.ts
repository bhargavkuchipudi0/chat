import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'app';
  constructor( private validate:ValidateService,private authservice:AuthService,private router:Router){}

  name:string;
  email:string;
  password:string;
  user:any;
  ngOnInit(){
  
  }
  submit_det(){
      
    if(this.validate.validateInput(this.name) && this.validate.validateInput(this.email)){
      if(this.validate.validateEmail(this.email)){
        if(this.validate.validateInput(this.password)){
          let user = {
            name:this.name,
            email:this.email,
            password:this.password
          }
          console.log(user);
          this.user = JSON.stringify(user);
            localStorage.setItem('user',this.user);
            this.router.navigate(['home']);
          // this.authservice.registerUser(user).subscribe(res => {
          //   console.log(res);
          
          // })
        }else{
          $('#password-err').html('Please enter your password');
          $('.log-password').css({'border':'1px solid red'});
      }
    }else{
     $('#email-err').html("Please enter valide Email");
     $('.log-email').css({'border':'red'});
    }
  }else{
    $('#name-err').html("please enter your name & eamil");
    $('.log-name').css({'border':'1px solid red'});
  }
}
}