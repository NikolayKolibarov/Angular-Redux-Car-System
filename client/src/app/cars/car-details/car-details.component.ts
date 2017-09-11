import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgRedux, select } from '@angular-redux/store';
import 'rxjs/add/operator/switchMap';

import { CarsActions } from '../../store/cars';

import { Car } from '../Car'
import { IAppState } from '../../store/IAppState';


@Component({
  selector: 'cs-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {

  @Input() car: Car;
  carReviews: Array<object>

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private carsActions: CarsActions,
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.carsActions
          .fetchCar(params['id']);

        this.carsActions
          .fetchCarReviews(params['id']);

        this.ngRedux
          .select('cars')
          .subscribe(cars => {
            this.car = cars['selected'];
          });

        this.ngRedux
          .select('cars')
          .subscribe(cars => {
            this.carReviews = cars['selectedCarReviews'];
          });
      });
  }

  addLike(carId): void {
    this.carsActions
      .incrementCarLike(carId);
  }

  addReview(carId, rating, comment): void {
    this.carsActions
      .addCarReview(carId, { rating, comment });
  }


  back(): void {
    this.location.back();
  }

}
