import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { switchMap, mergeMap } from 'rxjs/operators';

import { AutocompleteItem } from './autocomplete-item.entity';

@Component({
  selector: 'shr-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit, OnDestroy {
  // Property used to define the initial pattern of the autocomplete.
  @Input() pattern = '';

  // Property used to define the initial values of the autocomplete.
  @Input('items') set _items(value: AutocompleteItem[]) {
    this.items = [];
    this.pattern = this.pattern ? this.pattern : '';

    if (value) {
      this.items = value;
      this.itemsFiltered = this.items.filter(item => item.value.toUpperCase().indexOf(this.pattern.toUpperCase()) > -1);
    }
  }

  @Input() keepValueAfterSelect = false;

  // Property used to define the placeholder of the input field.
  @Input() placeholder: string;

  // Emit an event to notify that the value was changed
  @Output() itemSelect: EventEmitter<any> = new EventEmitter();

  // Visible state of the popup
  isPopUpVisible = false;

  // Setter value
  items: AutocompleteItem[];

  // Items after filtering with pattern
  itemsFiltered: AutocompleteItem[];

  // This element in the DOM
  private element: any;

  // To track click outside the component
  private htmlDom: Subscription;

  // To track mouse movements on the popup
  private popup: Subscription;

  // Index to track item highlighted by UP and DOWN keys
  private itemHighlighted = -1;

  constructor(viewContainer: ViewContainerRef) {
    this.element = viewContainer.element.nativeElement;
  }

  ngOnInit() {
    this.htmlDom = Observable.fromEvent(document, 'click')
      .subscribe((event: MouseEvent) => this.handleClick(event));

    this.popup = Observable.fromEvent(document, 'mouseover').debounceTime(200)
      .subscribe((event: MouseEvent) => this.handleMouseOver(event));
  }

  // Remove listeners before being destroyed.
  ngOnDestroy(): void {
    this.htmlDom.unsubscribe();
    this.popup.unsubscribe();
  }

  // Emit an event to notify that the user clicked on an item.
  itemSelected(item: AutocompleteItem): void {
    this.itemSelect.emit(item.data);
    this.isPopUpVisible = false;

    if (!this.keepValueAfterSelect) {
      this.pattern = '';
    } else {
      this.pattern = item.value;
    }
  }

  // Show or hide the pop-up.
  switchPopupVisible(): void {
    if (this.itemsFiltered.length > 0 && !this.isPopUpVisible) {
      this.isPopUpVisible = true;
    } else {
      this.isPopUpVisible = false;
    }
  }

  // If input was cleared, hide the popup.
  clearClicked(): void {
    this.isPopUpVisible = false;
  }

  // Watch for keyboard events and handle UP, DOWN and ENTER keystrokes.
  keyDown(event: any) {
    const key = event.key;

    if (key === 'Escape') {
      event.preventDefault();
      this.isPopUpVisible = false;
    }

    if (key === 'Enter' && this.isPopUpVisible && this.itemHighlighted > -1) {
      event.preventDefault();
      this.itemSelected(this.itemsFiltered[this.itemHighlighted]);
      this.itemHighlighted = -1;
    }

    if ((key === 'ArrowUp' || key === 'ArrowDown') && this.itemsFiltered.length > 0) {
      event.preventDefault();

      this.isPopUpVisible = true;

      if (this.itemHighlighted > -1) {
        this.itemsFiltered[this.itemHighlighted].selected.next(false);
      }

      if (key === 'ArrowDown' && this.itemHighlighted < this.itemsFiltered.length - 1) {
        this.itemHighlighted++;
      }

      if (key === 'ArrowUp') {
        if (this.itemHighlighted > 0) {
          this.itemHighlighted--;
        } else {
          this.itemHighlighted = 0;
        }
      }

      this.itemsFiltered[this.itemHighlighted].selected.next(true);
    }
  }

  patternChanged(pattern: string) {
    if (this.items) {
      if (this.itemHighlighted > -1) {
        this.itemsFiltered[this.itemHighlighted].selected.next(false);
        this.itemHighlighted = -1;
      }

      this.itemsFiltered = this.items.filter(item => item.value.toUpperCase().indexOf(this.pattern.toUpperCase()) > -1);
      this.isPopUpVisible = this.itemsFiltered.length ? true : false;
    }
  }

  // Check where the user clicked. If it's outside this component, close the popup.
  private handleClick(event: MouseEvent): void {
    if (!this.isPopUpVisible || !event.target) {
      return;
    }

    if (this.element !== event.target && !this.element.contains(event.target)) {
      this.isPopUpVisible = false;
    }
  }

  // Remove highlighting on the item which was hightlighted after a key DOWN or UP,
  // if the user moved mouse.
  private handleMouseOver(event: MouseEvent): void {
    if (!this.isPopUpVisible || !event.target || this.itemHighlighted < 0 || (event.movementX === 0 && event.movementY === 0)) {
      return;
    }

    this.itemsFiltered[this.itemHighlighted].selected.next(false);
  }
}
