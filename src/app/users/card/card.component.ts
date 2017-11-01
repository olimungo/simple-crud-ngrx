import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user.entity';

@Component({
  selector: 'feat-user-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
