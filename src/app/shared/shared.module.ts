import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SpinnerDirective } from './spinner/spinner.directive';
import { CrudButtonsComponent } from './crud-buttons/crud-buttons.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [SpinnerDirective, CrudButtonsComponent, SearchBarComponent],
  exports: [SpinnerDirective, CrudButtonsComponent, SearchBarComponent]
})
export class SharedModule { }
