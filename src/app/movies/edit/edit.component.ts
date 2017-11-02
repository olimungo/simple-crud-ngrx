import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from '../movie.entity';

@Component({
  selector: 'feat-movie-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class MovieEditComponent implements OnInit {
  @Input() set movie(value: Movie) {
    this.originalMovie = value ? value : null;
    this.title = value ? value.title : null;
    this.genre = value ? value.genre : null;
    this.year = value ? value.year : null;
    this.director = value ? value.director : null;
  }

  @Output() save = new EventEmitter<Movie>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();

  title: string;
  genre: string;
  year: number;
  director: string;

  private originalMovie: Movie;

  constructor() { }

  ngOnInit() {
  }

  _save() {
    this.originalMovie.title = this.title;
    this.originalMovie.genre = this.genre;
    this.originalMovie.year = this.year;
    this.originalMovie.director = this.director;
    this.save.emit(this.originalMovie);
  }

  _cancel() {
    this.cancel.emit();
  }

  _delete() {
    this.delete.emit(this.originalMovie.id);
  }
}
