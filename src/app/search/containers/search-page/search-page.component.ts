import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {
  options: string[] = [];
  searchTerm = '';

  constructor() { }

  ngOnInit() {
  }

  onSearchStart(searchTerm: string) {
    // Implement the method
  }

  onSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    // Implement the method
  }

}
