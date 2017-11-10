import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../movie.entity';

@Component({
  selector: 'feat-movie-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie;

  constructor() { }

  ngOnInit() {
    console.log(this.movie);
  }

}
