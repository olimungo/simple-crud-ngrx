import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer, ViewContainerRef } from '@angular/core';
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

export class AutocompleteComponent implements OnInit, OnDestroy, AfterViewInit {
  // Property used to define the initial pattern of the autocomplete.
  @Input('pattern') set _pattern(value: string) {
    this.pattern = value;
    console.log('pattern set', value)
  }

  // Property used to define the initial values of the autocomplete.
  @Input() set items(value: AutocompleteItem[]) {
    this._items = [];

    if (value) {
      this._items = value;
      this.itemsFiltered = this._items.filter(item => item.value.toUpperCase().indexOf(this.pattern.toUpperCase()) > -1);
    }
  }

  // Property used to define the placeholder of the input field.
  @Input() placeholder: string;

  // Emit an event to notify that the value was changed
  @Output() itemSelect: EventEmitter<any> = new EventEmitter();

  // Visible state of the popup
  isPopUpVisible = false;

  // Setter value
  _items: AutocompleteItem[];

  // Items after filtering with pattern
  itemsFiltered: AutocompleteItem[];

  // This element in the DOM
  private element: any;

  // To track click outside the component
  private htmlDom: Subscription;

  // To track mouse movements on the popup
  private popup: Subscription;

  // autocomplete-item of the popup in the DOM
  private itemsDom: any[] = [];

  // Index to track item highlighted by UP and DOWN keys
  private itemDomHighlighted = -1;

  pattern = '';

  constructor(private renderer: Renderer, viewContainer: ViewContainerRef) {
    this.element = viewContainer.element.nativeElement;
  }

  ngOnInit() {
    if (!this.pattern) {
      this.pattern = '';
    }

    this.htmlDom = Observable.fromEvent(document, 'click')
      .subscribe((event: MouseEvent) => this.handleClick(event));

    this.popup = Observable.fromEvent(document, 'mouseover').debounceTime(500)
      .subscribe((event: MouseEvent) => this.handleMouseOver(event));
  }

  ngAfterViewInit() {
    this.itemsDom = this.element.getElementsByClassName('autocomplete-item');
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
  }

  // Show or hide the pop-up.
  switchPopupVisible(): void {
    if (this.itemsDom.length > 0 && !this.isPopUpVisible) {
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

    if (key === 'Enter' && this.isPopUpVisible && this.itemDomHighlighted > -1) {
      event.preventDefault();
      this.itemSelected(this._items[this.itemDomHighlighted]);
    }

    if ((key === 'ArrowUp' || key === 'ArrowDown') && this.itemsDom.length > 0) {
      event.preventDefault();

      this.isPopUpVisible = true;

      if (this.itemDomHighlighted > -1) {
        this.renderer.setElementStyle(this.itemsDom[this.itemDomHighlighted], 'background', '');
      }

      if (key === 'ArrowDown' && this.itemDomHighlighted < this.itemsDom.length - 1) {
        this.itemDomHighlighted++;
      }

      if (key === 'ArrowUp') {
        if (this.itemDomHighlighted > 0) {
          this.itemDomHighlighted--;
        } else {
          this.itemDomHighlighted = 0;
        }
      }

      this.renderer.setElementStyle(this.itemsDom[this.itemDomHighlighted], 'background', '#eee');
      this.renderer.invokeElementMethod(this.itemsDom[this.itemDomHighlighted], 'scrollIntoView', [false]);
    }
  }

  patternChange(pattern: string) {
    if (this._items) {
      if (this.itemDomHighlighted > -1) {
        this.renderer.setElementStyle(this.itemsDom[this.itemDomHighlighted], 'background', '');
        this.itemDomHighlighted = -1;
      }

      this.itemsFiltered = this._items.filter(item => item.value.toUpperCase().indexOf(this.pattern.toUpperCase()) > -1);
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
    if (!this.isPopUpVisible || !event.target || this.itemDomHighlighted < 0 || (event.movementX === 0 && event.movementY === 0)) {
      return;
    }

    this.renderer.setElementStyle(this.itemsDom[this.itemDomHighlighted], 'background', '');
  }
}
