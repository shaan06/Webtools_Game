import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-power',
  templateUrl: './power.component.html',
  styleUrls: ['./power.component.css']
})
export class PowerComponent implements OnInit {

  constructor(private router: Router) { }
  logout(){
    this.router.navigateByUrl('');
  }
  ngOnInit() {
  }

}
