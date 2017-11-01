import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../user.entity';

@Component({
  selector: 'feat-user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() set user(value: User) {
    this.originalUser = value ? value : null;
    this.firstname = value ? value.firstname : null;
    this.lastname = value ? value.lastname : null;
  }

  @Output() save = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();

  firstname: string;
  lastname: string;

  private originalUser: User;

  constructor() { }

  ngOnInit() {
    if (!this.user) {
      this.user = { id: '', firstname: '', lastname: '' };
    }
  }

  _save() {
    this.originalUser.firstname = this.firstname;
    this.originalUser.lastname = this.lastname;
    this.save.emit(this.originalUser);
  }

  _cancel() {
    this.cancel.emit();
  }

  _delete() {
    this.delete.emit(this.originalUser.id);
  }
}
