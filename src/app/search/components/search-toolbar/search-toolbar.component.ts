import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { AppMaterialModule } from '@app/app-material.module';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchToolbarComponent implements OnInit, OnDestroy {
  @ViewChild('search') search: ElementRef;

  @Input() options: string[];
  @Output() searchStart = new EventEmitter<string>();
  @Output() searchTerm = new EventEmitter<string>();

  searchControl: FormControl;

  onDestroy$ = new Subject<boolean>();

  @HostListener('document:keypress', ['$event'])
  onKeyPressEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.search.nativeElement.focus();
    }
  }

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initFormControl();
    this.registerIcons();
  }

  initFormControl() {
    this.searchControl = new FormControl('');

    this.searchControl.valueChanges
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((value: string) => {
        if (value && value.includes('/')) {
          const resetValue = value
            .split('')
            .filter(char => char !== '/')
            .join('');

          this.searchControl.setValue(resetValue, {emitEvent: false});
        } else {
          this.searchStart.emit(value);
        }
      });
  }

  setSearchTerm() {
    this.searchTerm.emit(this.searchControl.value);
    this.options = [];
  }

  registerIcons() {
    this.iconRegistry.addSvgIcon(
      'github',
      this.sanitizer.bypassSecurityTrustResourceUrl(`assets/img/github.svg`)
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [SearchToolbarComponent],
  declarations: [SearchToolbarComponent]
})
export class SearchToolbarModule {}
