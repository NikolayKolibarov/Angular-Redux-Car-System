import { Component, Input, OnInit } from '@angular/core';

import { AuthenticationActions } from '../../store/authentication';

@Component({
  selector: 'rb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationActions: AuthenticationActions
  ) {
  }

  ngOnInit() {

  }

  login(email, password): void {
    this.authenticationActions
      .login({ email, password });
  }

}
