import { NgModule } from '@angular/core';
import { SearchPageComponent } from './containers';
import { SearchToolbarModule, UserProfileModule } from './components';
import { SearchRoutingModule } from './search-routing.module';
import { AppMaterialModule } from '@app/app-material.module';
import { CommonModule } from '@angular/common';
import { SearchService } from '@app/search/services';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    SearchToolbarModule,
    UserProfileModule,
    SearchRoutingModule
  ],
  providers: [SearchService],
  exports: [SearchPageComponent],
  declarations: [SearchPageComponent]
})
export class SearchModule {}
