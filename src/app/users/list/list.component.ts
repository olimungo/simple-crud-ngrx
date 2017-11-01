import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../user.entity';

@Component({
  selector: 'feat-users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class UsersListComponent implements OnInit {
  @Input() users: User[];
  @Output() userSelected = new EventEmitter<User>();


  constructor() { }

  ngOnInit() {
  }

  edit(user: User) {
    this.userSelected.emit(user);
  }

}
