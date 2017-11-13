import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { SettingsModule } from './settings/settings.module';
import { ActorsModule } from './actors/actors.module';
import { MoviesModule } from './movies/movies.module';
import { metaReducers, StoreDevtoolsModule } from './state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule,
    EffectsModule.forRoot([]),
    CoreModule,
    SharedModule,
    HomeModule,
    SettingsModule,
    ActorsModule,
    MoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
