import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from './IAppState';
import { IAction } from './IAction';

import { AuthenticationService } from '../shared/authentication.service';
import { MessageService } from '../shared/message.service'

// Action
@Injectable()
export class AuthenticationActions {
    constructor(
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private authenticationService: AuthenticationService,
        private messageService: MessageService,
    ) { }

    static REGISTER: string = 'REGISTER';
    static LOGIN: string = 'LOGIN';
    static LOGOUT: string = 'LOGOUT';
    static AUTHENTICATION_ERROR: string = 'AUTHENTICATION_ERROR';

    register(user): void {
        this.authenticationService
            .register(user)
            .subscribe(response => {
                const data = response.json();

                if (data.success) {
                    this.ngRedux.dispatch({ type: AuthenticationActions.REGISTER });

                    this.messageService.showSuccessMessage(data.message);

                    this.router.navigate(['/login']);
                } else {
                    if (data.errors.email) {
                        this.messageService.showErrorMessage(data.errors.email);
                    } else if (data.errors.name) {
                        this.messageService.showErrorMessage(data.errors.name);
                    } else if (data.errors.password) {
                        this.messageService.showErrorMessage(data.errors.password);
                    }
                }
            });
    }

    login(user): void {
        this.authenticationService
            .login(user)
            .subscribe(response => {
                const data = response.json();

                if (data.success) {
                    this.ngRedux.dispatch({ type: AuthenticationActions.LOGIN, payload: { user: data.user } });

                    sessionStorage.setItem('token', data.token);

                    this.messageService.showSuccessMessage(data.message);

                    this.router.navigate(['/']);
                } else {
                    if (data.errors.email) {
                        this.messageService.showErrorMessage(data.errors.email);
                    } else if (data.errors.password) {
                        this.messageService.showErrorMessage(data.errors.password);
                    }
                }
            })
    }

    logout(): void {
        this.ngRedux.dispatch({ type: AuthenticationActions.LOGOUT });

        sessionStorage.removeItem('token');

        this.messageService.showSuccessMessage('Logged out successfully.');

        this.router.navigate(['/login']);
    }

    authenticationError(error): void {
        this.ngRedux.dispatch({ type: AuthenticationActions.AUTHENTICATION_ERROR, payload: error });
        this.messageService.showErrorMessage(error);
    }
}

// Reducer
export interface IAuthenticationState {
    authenticated: Boolean,
    currentUser: Object,
}

const initialState: IAuthenticationState = {
    authenticated: false,
    currentUser: null
}

export default function reducer(state: IAuthenticationState = initialState, action: IAction) {
    switch (action.type) {
        case AuthenticationActions.LOGIN:
            return Object.assign({}, state, { currentUser: action.payload.user, authenticated: true })
        case AuthenticationActions.LOGOUT:
            return Object.assign({}, state, { currentUser: null, authenticated: false })
        case AuthenticationActions.REGISTER:
        default:
            return state;
    }
}



