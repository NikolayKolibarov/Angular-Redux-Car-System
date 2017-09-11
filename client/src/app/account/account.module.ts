import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarsActions } from '../store/cars';

import { MaterialModule } from '../layouts/material.module'
import { AccountRoutingModule } from './account-routing.module'
import { CarsModule } from '../cars/cars.module'

import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AccountRoutingModule,
        CarsModule
    ],
    providers: [CarsActions],
    declarations: [
        UserProfileComponent,
    ],
    exports: [
    ]
})

export class AccountModule { }