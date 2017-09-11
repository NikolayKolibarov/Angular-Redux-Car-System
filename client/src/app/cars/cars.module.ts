import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../layouts/material.module'
import { CarsRoutingModule } from './cars-routing.module'

import { CarService } from '../shared/car.service';

import { CarsActions } from '../store/cars';

import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { CarListComponent } from './car-list/car-list.component';
import { ReviewListComponent } from './review-list/review-list.component';
import { CarItemComponent } from './car-item/car-item.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        CarsRoutingModule,
        
    ],
    providers: [CarService, CarsActions],
    declarations: [
        CarsComponent,
        CarDetailsComponent,
        CreateCarComponent,
        CarListComponent,
        CarItemComponent,
        ReviewListComponent
    ],
    exports: [
        CarListComponent,
        CarItemComponent
    ]
})

export class CarsModule { }