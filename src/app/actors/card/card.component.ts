import { Component, OnInit, Input } from '@angular/core';

import { Actor } from '../actor.entity';

@Component({
  selector: 'feat-actor-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class ActorCardComponent implements OnInit {
  @Input() actor: Actor;

  constructor() { }

  ngOnInit() {
  }

}
