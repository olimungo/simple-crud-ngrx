import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'core-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goGitHub() {
    window.open('https://github.com/olimungo/simple-crud-ngrx', '_blank');
  }
}
