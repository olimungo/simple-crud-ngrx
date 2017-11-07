import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './list/list.component';
import { MovieEditComponent } from './edit/edit.component';
import { MovieCardComponent } from './card/card.component';

import { reducer } from './state/movies.reducer';
import { Effects } from './state/movies.effects';
import { MoviesService } from './movies.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StoreModule.forFeature('movies', reducer),
    EffectsModule.forFeature([Effects]),
    SharedModule,
    MoviesRoutingModule
  ],
  declarations: [MoviesListComponent, MovieEditComponent, MovieCardComponent],
  providers: [MoviesService]
})
export class MoviesModule { }
