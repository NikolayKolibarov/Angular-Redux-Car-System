import { Component, Input, OnInit } from '@angular/core';

import { AuthenticationActions } from '../../store/authentication';

@Component({
  selector: 'rb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authenticationActions: AuthenticationActions
  ) {
  }

  ngOnInit() {

  }

  register(name, email, password, confirmPassword): void {
    this.authenticationActions
      .register({ name, email, password, confirmPassword });
  }

}
