import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule
} from '@angular/material';

const MATERIAL_MODULE = [
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatAutocompleteModule,
  MatButtonModule
];

@NgModule({
  imports: MATERIAL_MODULE,
  exports: MATERIAL_MODULE
})
export class AppMaterialModule { }
