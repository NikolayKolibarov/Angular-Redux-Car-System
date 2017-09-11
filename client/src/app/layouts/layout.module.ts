import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module'
import { AppRoutingModule } from '../app-routing.module';

import { HeaderComponent } from './master/header/header.component';
import { MasterLayoutComponent } from './master/master-layout.component';
import { HomeComponent } from '../home.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
  ],
  declarations: [
    MasterLayoutComponent,
    HeaderComponent,
    HomeComponent
  ],
  exports: [MasterLayoutComponent, HeaderComponent]
})

export class LayoutModule { }