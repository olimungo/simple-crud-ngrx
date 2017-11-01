import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  users: Observable<User[]>;
  selectedUser: User;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit() {
    this.users = this.usersService.list();

    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.usersService.get(id).subscribe(user => this.selectedUser = user);
      }
    });
  }

  edit(user: User) {
    this.selectedUser = user;
  }

  save(user: User) {
    if (!user.id) {
      this.usersService.add(user).subscribe(_ => this.users = this.usersService.list());
    } else {
      this.usersService.save(user).subscribe(_ => this.users = this.usersService.list());
    }

    this.selectedUser = null;
  }

  cancel() {
    this.selectedUser = null;
    this.users.do(users => console.log(users));
  }

  delete(id: string) {
    this.usersService.delete(id).subscribe(_ => this.users = this.usersService.list());

    this.selectedUser = null;
  }

  add() {
    this.selectedUser = <User>{};
  }
}
