import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SpinnerDirective } from './spinner/spinner.directive';
import { CrudButtonsComponent } from './crud-buttons/crud-buttons.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { AutocompleteInputComponent } from './autocomplete/input/input.component';
import { AutocompletePopupComponent } from './autocomplete/popup/popup.component';
import { AutocompletePopUpItemComponent } from './autocomplete/popup/item/item.component';
import { TagComponent } from './tag/tag.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    SpinnerDirective, CrudButtonsComponent, SearchBarComponent, TagComponent,
    AutocompleteComponent, AutocompleteInputComponent, AutocompletePopupComponent, AutocompletePopUpItemComponent
  ],
  exports: [SpinnerDirective, CrudButtonsComponent, SearchBarComponent, AutocompleteComponent, TagComponent]
})
export class SharedModule { }
