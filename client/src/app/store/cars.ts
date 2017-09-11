import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Router } from '@angular/router';

import { IAppState } from './IAppState';
import { IAction } from './IAction';

import { CarService } from '../shared/car.service';
import { MessageService } from '../shared/message.service';

import { Car } from '../cars/Car';
import { Review } from '../cars/Review';

// Action
@Injectable()
export class CarsActions {
    constructor(
        private router: Router,
        private ngRedux: NgRedux<IAppState>,
        private carService: CarService,
        private messageService: MessageService,
    ) { }

    static FETCH_CARS: string = 'FETCH_CARS';
    static FETCH_CAR: string = 'FETCH_CAR';
    static FETCH_CAR_REVIEWS: string = 'FETCH_CAR_REVIEWS';
    static FETCH_USER_CARS: string = 'FETCH_USER_CARS';
    static CREATE_CAR: string = 'CREATE_CAR';
    static REMOVE_CAR: string = 'REMOVE_CAR';
    static SEARCH_CARS: string = 'SEARCH_CARS';
    static CAR_CREATE_REVIEW: string = 'CAR_CREATE_REVIEW';
    static CAR_INCREMENT_LIKE: string = 'CAR_INCREMENT_LIKE';
    static CARS_ERROR: string = 'CARS_ERROR';

    fetchCars(page = 1): void {
        this.carService
            .getCars(page)
            .then(cars => {
                this.ngRedux.dispatch({ type: CarsActions.FETCH_CARS, payload: { cars: cars } });
            });
    }

    fetchCar(carId): void {
        this.carService
            .getCar(carId)
            .then(car => {
                this.ngRedux.dispatch({ type: CarsActions.FETCH_CAR, payload: { car: car } });
            })
    }

    fetchCarReviews(carId): void {
        this.carService
            .getCarReviews(carId)
            .subscribe(response => {
                this.ngRedux.dispatch({ type: CarsActions.FETCH_CAR_REVIEWS, payload: { reviews: response.json() } });
            })
    }

    createCar(car): void {
        this.carService
            .create(car)
            .subscribe(response => {
                let data = response.json();

                if (data.success) {
                    this.ngRedux.dispatch({ type: CarsActions.CREATE_CAR });
                    this.messageService.showSuccessMessage(data.message);
                    this.router.navigate(['/cars']);
                } else {
                    if (data.errors.make) {
                        this.messageService.showErrorMessage(data.errors.make);
                    } else if (data.errors.model) {
                        this.messageService.showErrorMessage(data.errors.model);
                    } else if (data.errors.year) {
                        this.messageService.showErrorMessage(data.errors.year);
                    } else if (data.errors.engine) {
                        this.messageService.showErrorMessage(data.errors.engine);
                    } else if (data.errors.price) {
                        this.messageService.showErrorMessage(data.errors.price);
                    } else if (data.errors.image) {
                        this.messageService.showErrorMessage(data.errors.image);
                    }
                }
            })
    }

    removeCar(carId) {
        this.carService
            .delete(carId)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: CarsActions.REMOVE_CAR });
                    this.messageService.showSuccessMessage(response.json().message);
                    this.fetchUserCars();
                } else {
                    this.messageService.showErrorMessage(response.json().message);
                }
            })
    }

    searchCars(searchStr, page) {
        this.carService
            .search(searchStr, page)
            .then(cars => {
                this.ngRedux.dispatch({ type: CarsActions.SEARCH_CARS, payload: { cars: cars } });
            });
    }

    addCarReview(carId, review) {
        this.carService
            .addReview(carId, review)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: CarsActions.CAR_CREATE_REVIEW, payload: { review: response.json().review } });
                    this.fetchCarReviews(carId);
                    this.messageService.showSuccessMessage('Review was added successfully.');
                } else {
                    this.messageService.showSuccessMessage(response.json().message);

                }
            });
    }

    incrementCarLike(carId) {
        this.carService
            .addLike(carId)
            .subscribe(response => {
                if (response.json().success) {
                    this.ngRedux.dispatch({ type: CarsActions.CAR_INCREMENT_LIKE });
                } else {
                    this.messageService.showErrorMessage('Already liked.');
                }

            });
    }

    fetchUserCars() {
        this.carService
            .getUserCars()
            .subscribe(response => {
                this.ngRedux.dispatch({ type: CarsActions.FETCH_USER_CARS, payload: { cars: response.json() } });
            });
    }

    carsError(error): void {
        this.ngRedux.dispatch({ type: CarsActions.CARS_ERROR, payload: error });
        this.messageService.showErrorMessage(error);
    }
}

// Reducer
export interface ICarsState {
    all: Array<Car>,
    searchResults: Array<Car>,
    selected: Car,
    selectedCarReviews: Array<Review>,
    currentUserCars: Array<Car>
}

const initialState: ICarsState = {
    all: [],
    searchResults: [],
    selected: null,
    selectedCarReviews: [],
    currentUserCars: []
}

export default function reducer(state: ICarsState = initialState, action: IAction) {
    switch (action.type) {
        case CarsActions.FETCH_CARS:
            return Object.assign({}, state, { all: action.payload.cars })
        case CarsActions.FETCH_CAR:
            return Object.assign({}, state, { selected: action.payload.car })
        case CarsActions.FETCH_CAR_REVIEWS:
            return Object.assign({}, state, { selectedCarReviews: action.payload.reviews })
        case CarsActions.SEARCH_CARS:
            return Object.assign({}, state, { searchResults: action.payload.cars })
        case CarsActions.CAR_INCREMENT_LIKE:
            let updatedCar = Object.assign({}, state.selected);
            updatedCar['likes']++;
            return Object.assign({}, state, { selected: updatedCar });
        case CarsActions.FETCH_USER_CARS:
            return Object.assign({}, state, { currentUserCars: action.payload.cars })
        case CarsActions.CARS_ERROR:
            return Object.assign({}, state, { error: action.payload.error })
        case CarsActions.CREATE_CAR:
        case CarsActions.CAR_CREATE_REVIEW:
        case CarsActions.REMOVE_CAR:
        default:
            return state;
    }
}



