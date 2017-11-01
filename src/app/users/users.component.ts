import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/do';

import { UsersService } from './users.service';
import { User } from './user.entity';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.retrieve().subscribe(users => {
      this.users = users;

      this.route.params.subscribe(params => {
        const id = params['id'];

        if (id) {
          const filteredUsers = this.users.filter(user => user.id === id);
          this.selectedUser = filteredUsers.length ? filteredUsers[0] : null;
        }
      });
    });
  }

  edit(user: User) {
    this.selectedUser = user;
  }

  save(user: User) {
    if (!user.id) {
      this.addUser(user);
      this.usersService.create(user).subscribe();
    } else {
      this.usersService.update(user).subscribe();
    }

    this.selectedUser = null;
  }

  cancel() {
    this.selectedUser = null;
  }

  delete(id: string) {
    this.deleteUser(id);
    this.usersService.delete(id).subscribe();
    this.selectedUser = null;
  }

  add() {
    this.selectedUser = <User>{};
  }

  private addUser(user: User) {
    const index = this.users.findIndex(u => u.lastname + u.firstname > user.lastname + user.firstname);
    this.users.splice(index, 0, user);
  }

  private deleteUser(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
  }
}
