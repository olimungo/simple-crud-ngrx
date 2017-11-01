import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpinnerDirective } from './spinner/spinner.directive';
import { CrudButtonsComponent } from './crud-buttons/crud-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SpinnerDirective, CrudButtonsComponent],
  exports: [SpinnerDirective, CrudButtonsComponent]
})
export class SharedModule { }
