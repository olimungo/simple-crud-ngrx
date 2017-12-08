import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shr-crud-buttons',
  templateUrl: './crud-buttons.component.html',
  styleUrls: ['./crud-buttons.component.css']
})
export class CrudButtonsComponent implements OnInit {
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  _save() {
    this.save.emit();
  }

  _cancel() {
    this.cancel.emit();
  }

  _delete() {
    this.delete.emit();
  }
}
