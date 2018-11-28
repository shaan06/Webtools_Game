import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../Model/User';
import { THIS_EXPR, ThrowStmt, IfStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  constructor(private workout: WorkoutService, private router: Router) {
    this.user = this.workout.getUser();
    this.updatedpower = this.user.power;
      this.workout.getalluser().subscribe((data: User) => {
          this.users = data;
         // console.log(this.users.username + "From Constrrucotrr!!!!!!!!!!!!!")
      });
   
  
  }
  public arr: Array<String> = [];
  public power;
  public form;
  public users: User;
  public username: string;
  public user;
  public color: string = 'red';
  public display: string = 'none';
  public puzzel: [number, string, number] = [26, "blue" , 5];
  public updatedpower: number;
  public puzzelans1;
  lost = false;
  win = false;
  public wordcount = 0;
  public puzzelans2;
  Playarea8 = false;
  public puzzelans3;
  public puzzelans4;
  timeLeft: number = 300;
  public alert;
  public alert1;
  interval;
  Playarea7 = false;
  Playarea = false;
  Playarea6 = false;
  Playarea2 = false;
  Playarea3 = false;
  Playarea4 = false;
  Playarea5 = false;
  Playarea9 = false;
  userarea = true;
  PuzzelForm1: FormGroup;
  PuzzelForm3: FormGroup;
  PuzzelForm2: FormGroup;
  PuzzelForm4: FormGroup;
  UserForm: FormGroup;
 
enteruser(){
     this.form =  this.UserForm.value.UserForm;
      if (this.form !== this.user.username){
      this.workout.calluser(this.form).subscribe((data: User) => {
           if(data === null){
              alert("Please Enter Valid User");
              this.UserForm.reset();
              }
            else{
              this.username = data.username;
              this.power = data.power;
              if(data.isSignedin === true){
              this.Play();
              }
              else{
                alert("Your Opponent has not signed in, Please wait for him to login In")
              }
              }
        });
  
  }
  else{
    alert("Please enter different user");
  }
}
  logout(){
    this.workout.logout(this.user.username).subscribe((data: Boolean)=>{});
    this.router.navigateByUrl('login');
  }
  Play(){
    this.userarea = false;
    this.Playarea = true;
  }
  submit(){

    this.userarea = false;
    this.Playarea = false;
    this.Playarea2 = true;
    this.interval = setInterval(() => {
      if ( this.timeLeft > 0) {
       this.timeLeft--;
     } else {
        this.timeLeft = 0;
      }
    }, 1000 );
  }
  WordSubmit2(){
        this.puzzelans1 = this.PuzzelForm1.value.PuzzelForm1;
        const s =  this.solve(this.puzzelans1, this.puzzel[0]);
        if (s === true){
           this.Playarea2 = false;
          this.Playarea4 = true;
        }
    
      }
solve(p, s){
  if ( this.timeLeft !== 0 ){
    if(p === s && this.updatedpower !== 0){  
      this.power -= 10;
      if(this.updatedpower < 100){
      this.updatedpower += 5;
      }
      console.log(this.power);
      this.workout.sendpower(this.username, this.power).subscribe((data: Boolean) => {
        console.log(data);});
        this.workout.getupdatepower(this.username).subscribe((data: User) => {
          this.power = data.power;
          });
      this.workout.sendpower(this.user.username, this.updatedpower).subscribe((data: Boolean) => {});
      return true;
    }
    else{
      if (this.updatedpower > 10) {
        this.updatedpower -= 10;
        if(this.updatedpower < 40){
          this.alert = ("Play Carefully, you are destroying your ship!!!")
        }
        this.workout.sendpower(this.user.username, this.updatedpower).subscribe((data: Boolean) => {});
        this.workout.getupdatepower(this.username).subscribe((data: User) => {
        this.power = data.power;
        });
      }
   
    }
}
 else{
  this.router.navigateByUrl("timeout");
  this.PuzzelForm3.reset();
}
if(this.timeLeft < 20){
  this.color = 'red';
}
}
submit3(){
  this.Playarea3 = false;
  this.Playarea4 = true;
  this.timeLeft = 200;
}
WordSubmit4(){
  this.puzzelans2 = this.PuzzelForm2.value.PuzzelForm2;
  const s =  this.solve(this.puzzelans2, this.puzzel[1]);
  if (s === true){
    this.Playarea4 = false;
    this.Playarea5 = true;
  }

}
submit4(){
  if (this.updatedpower < 70){
    this.Playarea5 = false;
    this.Playarea6 = true;
    this.timeLeft = 300;
  }
  else{
    this.Playarea5 = false;
    this.Playarea7 = true;
    this.timeLeft = 300;
  }
}
WordSubmit5(){
  if ( this.timeLeft !== 0){
      this.puzzelans3 = this.PuzzelForm3.value.PuzzelForm3;
      if(this.arr.includes(this.puzzelans3)){
        alert("Already exists");
      }
      else{
      this.arr.push(this.puzzelans3);
      if (this.wordcount <= 5){
      this.workout.callword(this.puzzelans3).subscribe((data: Boolean) =>
      {
        if (data === true){
          this.wordcount += 1;
          this.power -= 10;
          if (this.updatedpower < 100){
          this.updatedpower += 2;
          }
          console.log(this.power);
          this.workout.sendpower(this.username, this.power).subscribe((dataa: Boolean) => {
            console.log(data);});
          this.workout.getupdatepower(this.username).subscribe((dataaa: User) => {
            this.power = dataaa.power;
          });
          this.workout.sendpower(this.user.username, this.updatedpower).subscribe((dataaaa: Boolean) => {});
            if (this.wordcount === 5) {
                if (this.updatedpower > this.power){
                  this.Playarea7 = false;
                  this.Playarea8 = true; 
                }
                else{
                  this.Playarea7 = false;
                  this.Playarea9 = true;
                }
            } 

        }
        else{
            console.log("Entered Else");
            this.updatedpower -= 5;
            if(this.updatedpower < 50){
              this.display = 'block';
              this.alert = "Play carefully, you are hurting your spaceship";
            }
            this.workout.sendpower(this.user.username, this.updatedpower).subscribe((dataa: Boolean) => {
              console.log(dataa);
              this.workout.getupdatepower(this.username).subscribe((dataaa: User) => {
                this.power = dataaa.power;
               });
          });
      }
    });
    if (this.wordcount === 3){
      this.alert1 ="Congratulations One more word to go";
    }
  }
  }
}
  else{
    this.router.navigateByUrl("timeout");
  }
}
WordSubmit6(){
  this.puzzelans4 = this.PuzzelForm4.value.PuzzelForm4;
  const s = this.solve1(this.puzzelans4, this.puzzel[2]); 
  if ( s === true){
    if (this.updatedpower > this.power){
    this.Playarea6 = false;
    this.workout.getupdatepower(this.user.username).subscribe((data: User) => {
      this.updatedpower = data.power;
    });
    this.Playarea8 = true;
  }

else{
  this.Playarea6 = false;
  this.workout.getupdatepower(this.user.username).subscribe((data: User) => {
    this.updatedpower = data.power;
  });
  this.Playarea9 = true;

}
}
}
solve1(p , s ){
  if ( this.timeLeft !== 0 ){

    if (p === s && this.updatedpower !== 0){  
      this.power -= 10;
      if(this.updatedpower < 100){
      this.updatedpower += 5;
      }
      console.log(this.power);
      this.workout.sendpower(this.username, this.power).subscribe((data: Boolean) => {
        console.log(data);});
      this.workout.getupdatepower(this.username).subscribe((data: User) => {
        this.power = data.power;
      });
      this.workout.sendpower(this.user.username, this.updatedpower).subscribe((data: Boolean) => {});
      return true;
    }
    else{
      if (this.updatedpower > 10) {
        this.updatedpower -= 10;
        if(this.updatedpower < 40){
          this.alert = ("Play Carefully, you are destroying your ship!!!")
        }
        this.workout.sendpower(this.user.username, this.updatedpower).subscribe((data: Boolean) => {});
        this.workout.getupdatepower(this.username).subscribe((data: User) => {
        this.power = data.power;
        });
      }
   
    }
  }
else{
this.router.navigateByUrl("timeout");
this.PuzzelForm3.reset();
}

}
 ngOnInit() {
  this.UserForm = new FormGroup({
    UserForm: new FormControl(null, Validators.required)
  });
    this.PuzzelForm1 = new FormGroup({
      PuzzelForm1: new FormControl(null, Validators.required),
    });
    this.PuzzelForm2 = new FormGroup({
      PuzzelForm2: new FormControl(null, Validators.required),
    });
    this.PuzzelForm3 = new FormGroup({
    PuzzelForm3: new FormControl(null, Validators.required)      
    });
    this.PuzzelForm4 = new FormGroup({
      PuzzelForm4: new FormControl(null, Validators.required)
    });

  }

}