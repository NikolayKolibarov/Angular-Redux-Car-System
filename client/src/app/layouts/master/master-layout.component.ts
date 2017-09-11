import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../store/IAppState';
import { AuthenticationActions } from '../../store/authentication';


@Component({
  selector: 'master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent {
  authenticated: boolean;
  user: object;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private authenticationActions: AuthenticationActions
  ) {
    this.ngRedux
      .select('authentication')
      .subscribe(authentication => this.authenticated = authentication['authenticated']);

    this.ngRedux
      .select('authentication')
      .subscribe(authentication => this.user = authentication['currentUser']);
  }

  ngOnInit() {


  }

  logout(): void {
    this.authenticationActions.logout();
  }


}
