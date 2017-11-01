import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
 import { UsersModule } from './users/users.module';
 import { CompaniesModule } from './companies/companies.module';
 import { MoviesModule } from './movies/movies.module';

import { simpleReducer } from '../reducers/simple.reducer';
import { postReducer } from '../reducers/post.reducer';

interface AppState {
  message: string;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      post: postReducer,
      message: simpleReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    CoreModule,
    SharedModule,
    UsersModule,
    CompaniesModule,
    MoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
