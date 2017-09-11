import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../store/IAppState';
import { CarsActions } from '../../store/cars';

import { Car } from '../Car'

@Component({
  selector: 'cs-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})

export class CreateCarComponent implements OnInit {
  constructor(
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private carsActions: CarsActions
  ) {
  }

  ngOnInit() {

  }

  create(make, model, year, engine, price, image, mileage): void {
   this.carsActions.createCar({make, model, year, engine, price, image, mileage});
  }

}
