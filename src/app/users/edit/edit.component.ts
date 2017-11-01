import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../user.entity';

@Component({
  selector: 'feat-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user: User;
  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  _save() {
    this.save.emit(this.user);
  }

  _cancel() {
    this.cancel.emit();
  }

  _delete() {
    this.delete.emit(this.user.id);
  }
}
