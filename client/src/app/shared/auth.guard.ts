import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { NgRedux, select } from '@angular-redux/store';

import { MessageService } from './message.service';

import { IAppState } from '../store/IAppState';


@Injectable()
export class AuthGuard implements CanActivate {

    authenticated: boolean

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private router: Router,
        private messageService: MessageService
    ) {
        this.ngRedux.select('authentication')
            .subscribe(authentication => this.authenticated = authentication['authenticated']);

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!this.authenticated) {
            this.messageService.showSuccessMessage('You must be logged in.');
            this.router.navigate(['/login']);
        }
        

        return this.authenticated;
    }
}