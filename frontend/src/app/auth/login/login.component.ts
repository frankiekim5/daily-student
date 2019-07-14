import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() signUpClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onSignUp() {
    this.signUpClick.emit();
  }

}
