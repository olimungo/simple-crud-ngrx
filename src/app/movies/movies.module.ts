import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MoviesRoutingModule
  ],
  declarations: [MoviesComponent]
})
export class MoviesModule { }
