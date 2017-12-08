import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shr-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() label: string;
  @Input() isClosable = true;
  @Input() color = '#aaa';

  @Output() closeClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  click() {
    this.closeClick.emit(null);
  }
}
