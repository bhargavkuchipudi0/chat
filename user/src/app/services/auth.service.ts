import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http:Http) { }

      registerUser(user){
        let header = new Headers();
        header.append('content-type','application/json');
        return this.http.post("http://localhost:3000/users/registerUser",user,{headers:header}).map(res => res.json());
      }
      
}
