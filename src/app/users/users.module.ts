import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouteConfigLoadEnd } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './list/list.component';
import { UserCardComponent } from './card/card.component';
import { UserEditComponent } from './edit/edit.component';

import { reducer } from './state/users.reducer';
import { Effects } from './state/users.effects';
import { UsersService } from './users.service';

import * as UsersActions from './state/users.actions';
import * as UsersReducer from './state/users.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature([Effects]),
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UsersListComponent, UserCardComponent, UserEditComponent],
  providers: [UsersService]
})
export class UsersModule {
  constructor(router: Router, store: Store<UsersReducer.State>) {
    router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadEnd) {
        if (event.route.path.indexOf('users') > -1) {
          store.dispatch(new UsersActions.GetList());
        }
      }
    });
  }
}
