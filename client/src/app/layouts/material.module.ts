import { NgModule } from '@angular/core';

import {
  MdButtonModule,
  MdCheckboxModule,
  MdSidenavModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MdInputModule,
  MdSnackBarModule,
  MdTableModule,
  MdListModule,
  MdRadioModule,
  MdPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule,
    MdTableModule,
    MdListModule,
    MdRadioModule,
    MdPaginatorModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdCardModule,
    MdInputModule,
    MdSnackBarModule,
    MdTableModule,
    MdListModule,
    MdRadioModule,
    MdPaginatorModule
  ],
})
export class MaterialModule { }