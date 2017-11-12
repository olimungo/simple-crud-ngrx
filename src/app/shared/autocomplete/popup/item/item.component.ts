import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutocompleteItem } from '../../autocomplete-item.entity';

@Component({
  selector: 'shr-autocomplete-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class AutocompletePopUpItemComponent {
  // Property used to define the value of the autocomplete.
  @Input() item: AutocompleteItem;

  // Property used to define the pattern to be highlighted.
  @Output() itemSelected: EventEmitter<AutocompleteItem> = new EventEmitter<AutocompleteItem>();

  selectItem() {
    this.itemSelected.emit(this.item);
  }
}
