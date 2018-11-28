import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './Model/User';
import { ConstantPool } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
private headers: HttpHeaders;
public userDetails: {};
private URL: string = 'https://localhost:44378/api/game';
public user: User;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
     }
  setUser(user){
    this.userDetails = user;
  }
  getUser(){
    return this.userDetails;
  }   
  sendpower(s, s1){
    const body =  JSON.stringify(s + ":" + s1);
    const sendpower = "/sendpower";
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.URL}${sendpower}`, body, {headers: headers});


  }
   signUp(user: User) {
      const body = JSON.stringify(user);
      const signup = "/signup";
      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      return this.http.post(`${this.URL}${signup}`, body, {headers: headers});
   }
   signin(s, s1) {
    const body = JSON.stringify(s + ":" + s1);
    const signin = "/signin";
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.URL}${signin}`, body, {headers: headers});

   }
   calluser(s){
    // const body = JSON.stringify(s);
     //const call = "game/username";
    const  s1 = "/" + s ;
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.http.get(`${this.URL}${s1}`, {headers: headers});

   }
   callword(s){
     console.log(s + "!!!!!!!!!!!!!!!!!!!!!!!s")
     const url = this.URL + "/word"
     const s1 =  "/" + s;
     const headers = new HttpHeaders({'Content-Type': 'application/json'});
     return this.http.get(`${url}${s1}`, {headers: headers});
   }
  getupdatepower(s){
    const url = this.URL + "/power";
    const s1 = "/" + s;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${url}${s1}`, {headers: headers});

  }
  AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }
  getalluser(){
    const url = this.URL + "/user";
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(`${url}` , {headers: headers});
  }
  logout(s){
    const url = this.URL + "/logout";
    const s1 = "/" + s;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${url}${s1}`, {headers: headers});


  }

}