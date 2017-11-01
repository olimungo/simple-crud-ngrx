import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[shrSpinner]'
})
export class SpinnerDirective implements OnInit {
  @Input() shrSpinner: string;

  constructor() {
    console.log('Spinner constructed!');
  }

  ngOnInit() {
    console.log('val:' + this.shrSpinner);
  }

}
