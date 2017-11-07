import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShellComponent } from './shell/shell.component';
import { ShellHeaderComponent } from './shell/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [ShellComponent, ShellHeaderComponent],
  exports: [ShellComponent]
})
export class CoreModule { }
