import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

import { RequesterService } from '../shared/requester.service'

import { Car } from '../cars/Car';
import { baseUrl } from './api';

@Injectable()
export class CarService {
    private carsUrl = `${baseUrl}/cars`;

    constructor(
        private http: Http,
        private requester: RequesterService
    ) { }

    getCars(page = 1): Promise<Car[]> {
        return this.http.get(`${this.carsUrl}/all?page=${page}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getCar(id: string): Promise<Car> {
        const url = `${this.carsUrl}/details/${id}`;

        return this.requester.get(url, true)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    create(car) {
        return this.requester.post(this.carsUrl + '/create', car, true);
    }

    delete(carId) {
        return this.requester.post(`${this.carsUrl}/delete/${carId}`, {}, true);
    }

    search(searchStr: string, page: number = 1): Promise<Car[]> {
        return this.http.get(`${this.carsUrl}/all?search=${searchStr}&page=${page}`)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    addLike(carId) {
        const url = `${this.carsUrl}/details/${carId}/like`;

        return this.requester.post(url, {}, true);
    }

    addReview(carId, review) {
        const url = `${this.carsUrl}/details/${carId}/reviews/create`;

        return this.requester.post(url, review, true);
    }

    getCarReviews(carId) {
        const url = `${this.carsUrl}/details/${carId}/reviews`;

        return this.requester.get(url, true);
    }

    getUserCars() {
        const url = `${this.carsUrl}/mine`;

        return this.requester.get(url, true);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}