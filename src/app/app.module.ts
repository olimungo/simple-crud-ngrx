import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

import { environment } from '../environments/environment';
import * as fromRoot from './state';

const metaReducers: MetaReducer<fromRoot.State>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([]),
    CoreModule,
    SharedModule,
    HomeModule,
    ProfileModule,
    UsersModule,
    MoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
