import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MoviesListComponent } from './list/list.component';
import { MovieEditComponent } from './edit/edit.component';
import { MovieCardComponent } from './card/card.component';

import { moviesReducer } from './movies.reducer';
import { MoviesEffects } from './movies.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    EffectsModule.forFeature([MoviesEffects]),
    SharedModule,
    MoviesRoutingModule
  ],
  declarations: [MoviesComponent, MoviesListComponent, MovieEditComponent, MovieCardComponent]
})
export class MoviesModule { }
