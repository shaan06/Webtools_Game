import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from '../workout.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from '../Model/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private workout: WorkoutService, private router: Router) { }
  SigninForm: FormGroup;
  public user: User[] = [];
  RegisterForm: FormGroup;
  public username: string;
  public power: 100;
  public isSignedIn: false;
  public password: string;
  formfirst =  true;
  formtwo = false;
  ngOnInit() {
    this.RegisterForm = new FormGroup({
      passwordRegister: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required ),
 });

  this.SigninForm = new FormGroup({

    password: new FormControl(null, Validators.required),

    username: new FormControl(null, Validators.required )
});
  }
  onSubmit() {
 this.username =  this.SigninForm.value.username;
 this.password = this.SigninForm.value.password;
 // console.log(this.type);
 // console.log((this.userService.signIn(this.email, this.password, this.type)));
   this.workout.signin(this.username, this.password).subscribe((data: User) => {
    if (data !== null) {
          this.workout.setUser(data);
          this.formtwo = true;
          this.formfirst = false;
          //  this.router.navigateByUrl('play');
    } 
else{
  alert("Invalid Credentials!");
  this.SigninForm.reset();
}1
 });
}
onRegister() {
    const user: User = new User(
      this.RegisterForm.value.passwordRegister,
      this.RegisterForm.value.username,
      this.power,
      this.isSignedIn
    );

   console.log(this.RegisterForm.value.passwordRegister, "!!!!!!!!!!!!!!!!!!!!!!!!");
    this.workout.signUp(user).subscribe((data: User) => {
        if (data != null) {
          console.log("Call From Workout!!!!!!!!!!!!!!!!!!!!!!!");
          alert("Please Login To Proceed");
        } else {
          alert("Something Went Wrong");
        }
    });
    this.RegisterForm.reset();
        }


part2(){
  this.router.navigateByUrl('story');


}
part1(){
  
  this.router.navigateByUrl('play')
}

}
