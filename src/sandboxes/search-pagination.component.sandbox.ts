import { sandboxOf } from 'angular-playground';
import { HttpClientModule } from '@angular/common/http';
import { SearchPaginationComponent, SearchPaginationModule } from '@app/search/components';

export default sandboxOf(SearchPaginationComponent, {
  imports: [
    HttpClientModule,
    SearchPaginationModule
  ],
  declareComponent: false
})
  .add('default state', {
    styles: [`
       :host {
         display: block;
         padding: 16px;
         height: 100vh;
     }
    `],
    context: {
      total: 57,
      perPage: 15,
      page: 1,
      onNext(nextPage) {
        this.page = nextPage;
      },
      onPrev(prevPage) {
        this.page = prevPage;
      }
    },
    template: `
      <div>Total items: {{ total }}</div>
      <div>Items per page: {{ perPage }}</div>
      <div>Current page: {{ page }}</div>
      <app-search-pagination
        [total]="total"
        [page]="page"
        [perPage]="perPage"
        (next)="onNext($event)"
        (prev)="onPrev($event)"
      ></app-search-pagination>
    `
  });
