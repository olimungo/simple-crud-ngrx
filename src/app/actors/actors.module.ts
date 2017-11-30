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

import { ActorsService } from './actors.service';

import { Actions, reducer, effects, State } from './state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StoreModule.forFeature('actors', reducer),
    EffectsModule.forFeature(effects),
    SharedModule,
    ActorsRoutingModule
  ],
  declarations: [ActorsListComponent, ActorCardComponent, ActorEditComponent],
  providers: [ActorsService]
})
export class ActorsModule {
  constructor(router: Router, store: Store<State>) {
    router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadEnd) {
        if (event.route.path.indexOf('actors') > -1) {
          store.dispatch(new Actions.GetList());
        }
      }
    });
  }
}
