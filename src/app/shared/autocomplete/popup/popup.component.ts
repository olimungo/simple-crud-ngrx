import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutocompleteItem } from '../autocomplete-item.entity';

@Component({
  selector: 'shr-autocomplete-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class AutocompletePopupComponent {
  @Input() items: AutocompleteItem[];

  @Output() itemSelect: EventEmitter<any> = new EventEmitter();

  // Emit an event to notify that the user clicked on an item.
  selectItem(item: AutocompleteItem): void {
    this.itemSelect.emit(item);
  }
}
