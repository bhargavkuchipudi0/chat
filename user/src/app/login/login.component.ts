import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ValidateService } from "../services/validate.service";
import { AuthService } from "../services/auth.service";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( private validate:ValidateService,private authservice:AuthService,private router:Router, public fb:FormBuilder){}

  firstname:string;
  lastname:string;
  email;
  phonenumber:any;
  password:any;
  formgroup:FormGroup;
  signupform;
  loginform;

  ngOnInit(){
    this.signupform = this.fb.group({
      firstname: ['',Validators.required,],
      lastname:['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phonenumber:['', Validators.required],
      password:['',Validators.required]
    });

    this.loginform = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required]
    });

  }

  signupSubmit() {
    this.markFormGroupTouched(this.signupform); //this will check for untouched formfields and validates them
    if(this.signupform.valid) {
      this.authservice.registerUser(this.signupform.value).subscribe((response) => {
        console.log(response);
        if(response.success) {
          this.signupform.reset();
        }
      });
    } else {

    }
  }

  loginSubmit(){
    this.markFormGroupTouched(this.loginform);
    if(this.loginform.valid) {
      this.authservice.loginUser(this.loginform.value).subscribe((response) => {
        console.log(response);
        if(response.success) {
          this.loginform.reset();
          this.router.navigate(['/home/Feeds']);
        }
      })
    } else {

    }
  }

  
  markFormGroupTouched(formGroup: FormGroup) {                          
    (<any>Object).values(formGroup.controls).forEach(control => {       
      control.markAsTouched();
      if (control.controls) {
        control.controls.forEach(c => this.markFormGroupTouched(c));
      }
    });
  }

}