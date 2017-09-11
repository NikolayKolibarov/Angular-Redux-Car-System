import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../layouts/material.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { GuestGuard } from '../shared/guest.guard';

import { AuthenticationActions } from '../store/authentication';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        AuthenticationRoutingModule,
    ],
    providers: [
        AuthenticationActions,
        GuestGuard
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    exports: []
})

export class AuthenticationModule { }