import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from '../movie.entity';

@Component({
  selector: 'feat-movies-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie[];
  @Output() movieSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  edit(id: string) {
    this.movieSelected.emit(id);
  }
}
