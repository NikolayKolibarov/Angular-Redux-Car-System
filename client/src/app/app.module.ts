import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { RequesterService } from './shared/requester.service';
import { AuthenticationService } from './shared/authentication.service'
import { MessageService } from './shared/message.service';

import { AuthGuard } from './shared/auth.guard'

import { LayoutModule } from './layouts/layout.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CarsModule } from './cars/cars.module';
import { AccountModule } from './account/account.module';

import { IAppState } from './store/IAppState';
import store from './store/store';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    NgReduxModule,
    LayoutModule,
    AuthenticationModule,
    CarsModule,
    AccountModule
  ],
  providers: [
    RequesterService,
    AuthenticationService,
    MessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}
