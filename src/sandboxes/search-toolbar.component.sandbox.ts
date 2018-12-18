import { sandboxOf } from 'angular-playground';
import { SearchToolbarModule, SearchToolbarComponent } from '@app/search/components';


export default sandboxOf(SearchToolbarComponent, {
  imports: [
    SearchToolbarModule
  ],
  declareComponent: false
})
  .add('default state', {
    styles: [`
       :host {
         display: block;
         height: 100vh;
     }
    `],
    context: {
      options: [],
      onSearchTerm(searchTerm: string) {
        console.log('searchTerm', searchTerm);
      },
      onSearchStart(searchTerm: string) {
        console.log('initial searchTerm', searchTerm);

        this.options = searchTerm.length ? ['foo', 'bar', 'baz'] : [];
      }
    },
    template: `
      <app-search-toolbar
        [options]="options"
        (searchStart)="onSearchStart($event)"
        (searchTerm)="onSearchTerm($event)"
      ></app-search-toolbar>
    `
  });
