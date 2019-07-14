import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  showRegister = false;

  constructor() { }

  ngOnInit() {
  }

  loadRegister() {
    this.showRegister = true;
  }

  loadLogin() {
    this.showRegister = false;
  }

}
