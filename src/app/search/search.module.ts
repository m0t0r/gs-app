import { NgModule } from '@angular/core';
import { SearchPageComponent } from './containers';
import { SearchToolbarModule } from './components';
import { SearchRoutingModule } from './search-routing.module';
import { AppMaterialModule } from '@app/app-material.module';

@NgModule({
  imports: [
    AppMaterialModule,
    SearchToolbarModule,
    SearchRoutingModule
  ],
  exports: [SearchPageComponent],
  declarations: [SearchPageComponent]
})
export class SearchModule {}
