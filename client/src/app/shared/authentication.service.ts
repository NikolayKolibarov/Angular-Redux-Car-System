import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { RequesterService } from '../shared/requester.service';

import { baseUrl } from './api';


@Injectable()
export class AuthenticationService {
    private usersUrl = `${baseUrl}/auth`;  // URL to web api

    constructor(
        private http: Http,
        private requester: RequesterService,
    ) { }

    register(user) {
        return this.requester.post(this.usersUrl + '/signup', user, false);
    }

    login(user) {
        return this.requester.post(this.usersUrl + '/login', user, false);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}