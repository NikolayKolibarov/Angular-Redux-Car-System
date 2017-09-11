import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { CarsActions } from '../../store/cars';

import { Car } from '../Car';
import { IAppState } from '../../store/IAppState';


@Component({
  selector: 'cs-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  private cars: Array<Car>
  private searchResults: Array<Car>
  private page: number
  private search: string


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private carsActions: CarsActions,
  ) {

    this.cars = [];
    this.searchResults = [];
    this.page = 1;
    this.search = '';
  }

  ngOnInit() {
    this.carsActions.fetchCars();

    this.ngRedux
      .select('cars')
      .subscribe(cars => {
        this.cars = cars['all'];
      });

  }

  searchCars(searchStr): void {
    this.carsActions.searchCars(searchStr, this.page);

    this.ngRedux
      .select('cars')
      .subscribe(cars => {
        this.searchResults = cars['searchResults'];
      });

    this.page = 1;
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;

      if (this.search != '') {
        this.carsActions.searchCars(this.search, this.page)
      } else {
        this.carsActions.fetchCars(this.page);
      }
    }

  }

  nextPage(): void {
    this.page++;

    if (this.search != '') {
      this.carsActions.searchCars(this.search, this.page)
    } else {
      this.carsActions.fetchCars(this.page);
    }

  }

  hasPreviousPage(): boolean {
    return this.page > 1;
  }

  hasNextPage(): boolean {
    if (this.search === '') {
      return this.cars.length > 0;
    } else {
      return this.searchResults.length > 0;
    }

  }
}
