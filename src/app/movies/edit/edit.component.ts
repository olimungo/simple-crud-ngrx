import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from '../movie.entity';

@Component({
  selector: 'feat-movie-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class MovieEditComponent implements OnInit {
  @Input() set movie(value: Movie) {
    this.id = value ? value.id : null;
    this.title = value ? value.title : null;
    this.genre = value ? value.genre : null;
    this.year = value ? value.year : null;
    this.director = value ? value.director : null;
  }

  @Output() save = new EventEmitter<Movie>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<string>();

  id: string;
  title: string;
  genre: string;
  year: number;
  director: string;

  constructor() { }

  ngOnInit() {
  }

  _save() {
    this.save.emit({ id: this.id, title: this.title, genre: this.genre, year: this.year, director: this.director });
  }

  _cancel() {
    this.cancel.emit();
  }

  _delete() {
    this.delete.emit(this.id);
  }
}
