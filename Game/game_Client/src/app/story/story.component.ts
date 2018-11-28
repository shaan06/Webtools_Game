import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../Model/User';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  constructor(private workout: WorkoutService, private router: Router) {
    this.user = this.workout.getUser();
     this.updatedpower = this.user.power;
  }
  public user;
  public arr: Array<String> = [];
  public updatedpower: number;
  interval;
  public puzzel: [number, string, number, string] = [26, "blue" , 5 ,"same"];
  public display: string = 'none';
  Spart1 = true;
  Spart2 = false;
  Spart3 = false;
  Spart4  =false;
  Spart5 =  false;
  Spart6 =  false;
  brkship = false;
  blank = false;
  comm = false;
  probsolve1 = false;
  Playarea2 =false;
  Playarea4 = false;
  aftship =  false;
  public alert;
  public alert1;
  public puzzelans1;
  public puzzelans2;
  Playarea8 = false;
  public puzzelans3;
  public puzzelans4;
  public wordcount = 0;
  Playarea7 = false;
  timeLeft: number = 200;
  PuzzelForm1: FormGroup;
  PuzzelForm3: FormGroup;
  PuzzelForm2: FormGroup;
  PuzzelForm4: FormGroup;



Accept(){
  this.Spart2 = true;
  this.Spart1 = false;

}

prob1(){
this.Spart3 = true;
this.Spart2 = false;
this.interval = setInterval(() => {
  if ( this.timeLeft > 0) {
   this.timeLeft--;
 } else {
    this.timeLeft = 0;
  }
}, 1000 );
}
solveprob1(){
  this.Playarea2 = true;
  this.Spart3 = false;
  this.timeLeft = 200;
}
WordSubmit2(){
  this.puzzelans1 = this.PuzzelForm1.value.PuzzelForm1;
  const s =  this.solve(this.puzzelans1, this.puzzel[0]);
  if (s === true){
     this.Playarea2 = false;
    this.probsolve1 = true;
  }
}
communication(){
  this.Spart4 = true;
  this.probsolve1 = false;
  this.timeLeft = 200;

}
WordSubmit4(){
  this.puzzelans2 = this.PuzzelForm2.value.PuzzelForm2;
  const s =  this.solve(this.puzzelans2, this.puzzel[1]);
  if (s === true){
    this.Playarea4 = false;
    this.comm = true;
  }

}
helpcommunication(){
  this.Playarea4 = true;
  this.Spart4 =  false; 
  this.timeLeft = 200;

}
leftcommunication(){
   let pow = Math.floor(Math.random()*25)+1
   this.user.power -= pow;
   this.workout.sendpower(this.user.username, this.user.power).subscribe((data: Boolean) => {
    console.log("true");

});
this.workout.getupdatepower(this.user.username).subscribe((data: User) => {
  this.updatedpower = data.power;
 });

  this.Spart5 =  true;
  this.Spart4 = false;
}
moveahead(){
  this.Spart6 = true;
  this.comm = false;
  this.timeLeft = 200;
  }
  moveahead1(){
  this.Spart5 = false;
  this.Spart6 = true;
  this.timeLeft = 200;
}

  abcd(){
    this.Spart6 = false;
    //  this.Playarea7 = true;
     this.aftship = true;
     this.timeLeft = 200;
  }
  WordSubmit6(){
    this.puzzelans4 = this.PuzzelForm4.value.PuzzelForm4;
    const s = this.solve1(this.puzzelans4, this.puzzel[2]); 
    if ( s === true){
      if( this.user.power + 20 > 100 ){
        this.user.power = 100;
        this.workout.sendpower(this.user.username, this.user.power ).subscribe((data: User) => {
          console.log("true");
        });
      }
      else{
        this.user.power += 20;
        this.workout.sendpower(this.user.username, this.user.power ).subscribe((data: User) => {
          console.log("true");
        });
      }

      this.workout.getupdatepower(this.user.username).subscribe((data: User) => {
          this.updatedpower = data.power;
      });

  }
  this.brkship = false;
  this.aftship = true;
  }
  afterbrokenship(){
this.brkship = false;
this.aftship = true;
this.timeLeft = 200;
  
  }
  inprob(){
    this.aftship = false;
    this.blank = true;
    this.timeLeft = 200;
  }
  runprob(){
    this.blank = false;
    this.Playarea7 = true;
    this.timeLeft = 200;
  }
  brokenship(){
    this.Spart6 = false;
    this.brkship = true;
    this.timeLeft = 200;

  }

solve(p, s){
  if ( this.timeLeft !== 0 ){

        if ( p === s && this.user.power !== 0){
            // this.Playarea2 = false;
            // this.Playarea3 = true;
            return true;
        }
        else{
           if (this.user.power > 0)
          {
 
              this.user.power -= 10;
                if(this.user.power < 50){
                  this.display = 'block';
                  this.alert = "Play carefully, you are hurting your spaceship";
                }
              this.workout.sendpower(this.user.username, this.user.power).subscribe((data: Boolean) => {
              console.log("true");

          });
        
        }
      }
    this.workout.getupdatepower(this.user.username).subscribe((data: User) => {
     
    this.updatedpower = data.power;
    if(this.updatedpower < 10){
      this.router.navigateByUrl("power");
      this.PuzzelForm3.reset();
    }
    
  });
 }
 else{
  this.router.navigateByUrl("timeout");
  this.PuzzelForm3.reset();
}
}
solve1(p , s ){
  if ( this.timeLeft !== 0 ){

    if ( p === s && this.user.power !== 0){
        // this.Playarea2 = false;
        // this.Playarea3 = true;
        this.user.power += 10;
        this.workout.sendpower(this.user.username, this.user.power).subscribe((data: Boolean) => {
        // console.log("true");
        });

        return true;
    }
    else{
       if (this.user.power > 0)
      {

          this.user.power -= 10;
            if(this.user.power < 50){
              this.display = 'block';
              this.alert = "Play carefully, you are hurting your spaceship";
            }
          this.workout.sendpower(this.user.username, this.user.power).subscribe((data: Boolean) => {
          console.log("true");
        });
    
      }
    }
  this.workout.getupdatepower(this.user.username).subscribe((data: User) => {
   
  this.updatedpower = data.power;
  if(this.updatedpower < 10){
    this.router.navigateByUrl("power");
    this.PuzzelForm3.reset();
  }
  
  });
  }
  else{
  this.router.navigateByUrl("timeout");
  this.PuzzelForm3.reset();
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
              if (this.wordcount === 5){
                  this.Playarea7 = false;
                  this.Playarea8 = true;
              } 
          }
          else{
              this.user.power -= 5;
              if(this.user.power < 50){
                this.display = 'block';
                this.alert = "Play carefully, you are hurting your spaceship";
              }
              this.workout.sendpower(this.user.username, this.user.power).subscribe((dataa: Boolean) => {
                console.log(dataa);
                this.workout.getupdatepower(this.user.username).subscribe((dataaa: User) => {
                  this.updatedpower = dataaa.power;
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
  ngOnInit() {
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
  newmode(){
    this.router.navigateByUrl('play');
  }
  logout(){
    this.router.navigateByUrl('');
  }

}
