import { Component, ElementRef, EventEmitter, Input, Output, Renderer, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'shr-autocomplete-input',
  templateUrl: 'input.component.html',
  styleUrls: ['input.component.css']
})
export class AutocompleteInputComponent implements OnInit {
  // Property used to define the initial value of the autocomplete.
  @Input() pattern: string;

  // Property used to define the placeholder of the input field.
  @Input() placeholder = '';

  // Emit an event to notify that the input field was clicked
  @Output() inputClick: EventEmitter<any> = new EventEmitter<any>();

  // Emit an event to notify that the clear button was clicked
  @Output() clearClick: EventEmitter<any> = new EventEmitter<any>();

  // Emit an event to notify that the pattern was modified
  @Output() patternChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('input') input: ElementRef;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    if (!this.pattern) {
      this.pattern = '';
    }

    if (!this.placeholder) {
      this.placeholder = '';
    }
  }

  inputClicked() {
    this.inputClick.emit(null);
  }

  patternChanged() {
    this.patternChange.emit(this.pattern);
  }

  clear(): void {
    this.pattern = '';
    this.patternChange.emit(this.pattern);
    this.clearClick.emit(null);
    this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', []);
  }
}
