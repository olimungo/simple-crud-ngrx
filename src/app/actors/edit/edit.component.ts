import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { State, Reducer, Actions } from '../state';
import { Actor } from '../../core/models';

@Component({
  selector: 'feat-actor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ActorEditComponent implements OnInit, OnDestroy {
  actor: Actor;

  loading: Observable<boolean>;

  private actorSubscrition: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<State>
  ) {
    this.loading = this.store.select(Reducer.getLoading);

    // Cannot handle an HTML input field with an Observable. So, we need to subscribe to the element in the store...
    // ...and unsubscribe when component is destroyed (see ngOnDestroy)
    this.actorSubscrition = this.store
      .select(Reducer.getSelectedActor)
      .subscribe(actor => {
        this.actor = { ...actor };
      });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new Actions.Edit(params['id']));
      }
    });
  }

  ngOnDestroy() {
    this.actorSubscrition.unsubscribe();
  }

  save() {
    if (this.actor.id) {
      this.store.dispatch(new Actions.Update(this.actor));
    } else {
      this.store.dispatch(new Actions.Create(this.actor));
    }

    this.backToList();
  }

  cancel() {
    this.store.dispatch(new Actions.Cancel());
    this.backToList();
  }

  delete() {
    this.store.dispatch(new Actions.Delete(this.actor.id));
    this.backToList();
  }

  backToList() {
    this.router.navigate(['actors']);
  }
}
