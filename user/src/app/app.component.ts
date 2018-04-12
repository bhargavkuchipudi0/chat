import { Component , OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ValidateService } from "./services/validate.service";
import { AuthService } from "./services/auth.service";
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor( private validate:ValidateService,private authservice:AuthService,private router:Router){}

  name:string;
  email:string;
  password:string;
  ngOnInit(){
  
  }
  
}