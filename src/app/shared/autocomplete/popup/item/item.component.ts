import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
  Output,
  Renderer,
  ViewContainerRef
} from '@angular/core';
import { AutocompleteItem } from '../../autocomplete-item.entity';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'shr-autocomplete-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class AutocompletePopUpItemComponent implements OnInit, OnDestroy {
  @Input() item: AutocompleteItem;

  @Output()
  itemSelected: EventEmitter<AutocompleteItem> = new EventEmitter<
    AutocompleteItem
  >();

  // This element in the DOM
  private element: any;

  private itemHighlightedSubscription: Subscription;

  constructor(private renderer: Renderer, viewContainer: ViewContainerRef) {
    this.element = viewContainer.element.nativeElement;
  }

  ngOnInit() {
    this.item.selected = new Subject();

    this.itemHighlightedSubscription = this.item.selected.subscribe(value => {
      if (value) {
        this.renderer.invokeElementMethod(this.element, 'scrollIntoView', [
          false
        ]);
      }
    });
  }

  ngOnDestroy() {
    this.itemHighlightedSubscription.unsubscribe();
  }

  selectItem() {
    this.itemSelected.emit(this.item);
  }
}
