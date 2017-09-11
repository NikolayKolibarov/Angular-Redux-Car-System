import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { CarsActions } from '../../store/cars';
import { IAppState } from '../../store/IAppState';

import { Car } from '../../cars/Car';

@Component({
  selector: 'rb-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  cars: Array<Car>

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private carsActions: CarsActions
  ) {
  }

  ngOnInit() {
    this.carsActions.fetchUserCars();

    this.ngRedux
      .select('cars')
      .subscribe(cars => {
        this.cars = cars['currentUserCars'];
      });

  }

  remove(carId): void {
    this.carsActions.removeCar(carId);
  }

}
