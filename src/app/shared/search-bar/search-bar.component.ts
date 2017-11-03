import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shr-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Output() patternChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  change(pattern: string) {
    this.patternChange.emit(pattern);
  }
}
