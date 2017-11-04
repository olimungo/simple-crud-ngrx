import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../user.entity';

@Component({
  selector: 'feat-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() set user(value: User) {
    this.id = value ? value.id : null;
    this.firstname = value ? value.firstname : null;
    this.lastname = value ? value.lastname : null;
  }

  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();

  id: string;
  firstname: string;
  lastname: string;

  constructor() { }

  ngOnInit() {
    if (!this.user) {
      this.user = { id: '', firstname: '', lastname: '' };
    }
  }

  _save() {
    const user: User = { id: this.id, firstname: this.firstname, lastname: this.lastname };
    this.save.emit(user);
  }

  _cancel() {
    this.cancel.emit();
  }

  _delete() {
    this.delete.emit(this.id);
  }
}
