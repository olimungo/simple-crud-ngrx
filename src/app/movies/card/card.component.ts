import { Component, OnInit, Input } from '@angular/core';
import { Movie, Actor } from '../../core/models';

@Component({
  selector: 'feat-movie-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;

  actors = '';

  constructor() { }

  ngOnInit() {
    if (this.movie && this.movie.actors) {
      this.actors = this.movie.actors
        .map((actor: Actor) => actor.fullname).join(', ');
    }
  }

}
