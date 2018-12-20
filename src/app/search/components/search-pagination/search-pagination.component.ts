import { Component, NgModule, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '@app/app-material.module';

@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.scss']
})
export class SearchPaginationComponent implements OnChanges {
  @Input() page: number;
  @Input() total: number;
  @Input() perPage: number;

  @Output() next = new EventEmitter<number>();
  @Output() prev = new EventEmitter<number>();

  public hasNext = false;
  public hasPrev = false;

  public nextPage: number;
  public prevPage: number;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.page && this.total && this.perPage) {
      const totalPagesApprox = Math.floor(this.total / this.perPage);
      const totalPages = this.total % this.perPage === 0 ? totalPagesApprox : totalPagesApprox + 1;

      this.hasPrev = this.page > 1;
      this.hasNext = this.page !== totalPages;

      this.nextPage = this.page + 1;
      this.prevPage = this.page - 1;
    }
  }

}

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [SearchPaginationComponent],
  declarations: [SearchPaginationComponent]
})
export class SearchPaginationModule { }
