import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router , Route , ActivatedRoute } from "@angular/router";
declare var $:any;
@Component({
  selector: 'app-root', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router, private activatedRoute:ActivatedRoute) { 
  }

  selectedRoute:string = 'Feeds';

  ngOnInit() {
    this.selectedRoute = this.router.url.split('/')[2];
  }

  routerchange(){
    setTimeout(() => {
      this.selectedRoute = this.router.url.split('/')[2];
    },0);
  }
}
