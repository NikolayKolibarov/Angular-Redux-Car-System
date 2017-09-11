import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/auth.guard'

import { CarsComponent } from './cars/cars.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CreateCarComponent } from './create-car/create-car.component';

const routes: Routes = [
    { path: 'cars', component: CarsComponent },
    { path: 'cars/details/:id', component: CarDetailsComponent, canActivate: [AuthGuard] },
    { path: 'cars/create', component: CreateCarComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CarsRoutingModule { }