import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';

const MATERIAL_MODULE = [
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatAutocompleteModule
];

@NgModule({
  imports: MATERIAL_MODULE,
  exports: MATERIAL_MODULE
})
export class AppMaterialModule { }
