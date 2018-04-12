import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http:Http) { }

      registerUser(user){
        let header = new Headers();
        header.append('content-type','application/json');
        console.log(user);
        return this.http.post("http://localhost:3000/registerUser",user,{headers:header}).map(res => res.json());
      }
      get_all_users(){
        return this.http.get("http://localhost:3000/getAllUsers").map(res => res.json());
      }
      
}
