import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, RouteConfigLoadEnd } from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';

import { ActorsRoutingModule } from './actors-routing.module';
import { ActorsListComponent } from './list/list.component';
import { ActorCardComponent } from './card/card.component';
import { ActorEditComponent } from './edit/edit.component';

import { reducer } from './state/actors.reducer';
import { Effects } from './state/actors.effects';
import { ActorsService } from './actors.service';

import * as ActorsActions from './state/actors.actions';
import * as ActorsReducer from './state/actors.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StoreModule.forFeature('actors', reducer),
    EffectsModule.forFeature([Effects]),
    SharedModule,
    ActorsRoutingModule
  ],
  declarations: [ActorsListComponent, ActorCardComponent, ActorEditComponent],
  providers: [ActorsService]
})
export class ActorsModule {
  constructor(router: Router, store: Store<ActorsReducer.State>) {
    router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadEnd) {
        if (event.route.path.indexOf('actors') > -1) {
          store.dispatch(new ActorsActions.GetList());
        }
      }
    });
  }
}
