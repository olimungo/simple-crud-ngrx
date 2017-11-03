import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shr-shell-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class ShellHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
